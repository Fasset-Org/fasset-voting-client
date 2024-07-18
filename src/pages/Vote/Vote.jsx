import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import ApiQuery from "../../ApiQuery";
import { Form, Formik } from "formik";
import * as Yup from "yup";
// import AlertPopup from "../../components/AlertPopup";

const Vote = () => {
  const [value, setValue] = React.useState(0);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const isAuth = useIsAuthenticated();
  const { accounts } = useMsal();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return ApiQuery.getAllCategories();
    }
  });

  const { data: employeeData } = useQuery({
    queryKey: ["employees"],
    queryFn: () => {
      return ApiQuery.getAllEmployees();
    }
  });

  const filterByType = (type) => {
    return employeeData?.employees?.filter((option) => option.type === type);
  };

  const filterByPosition = (position) => {
    return employeeData?.employees?.filter(
      (option) => option.position?.toLowerCase() === position?.toLowerCase()
    );
  };

  const filterAllEmployees = (position) => {
    return employeeData?.employees?.filter(
      (option) =>
        option.position?.toLowerCase() !== "intern" &&
        option.position?.toLowerCase() !== "department"
    );
  };

  const {
    data: respData,
    // isError,
    // isSuccess,
    isLoading,
    mutate
  } = useMutation({
    mutationFn: (formData) => {
      return ApiQuery.castVote(formData);
    },
    onSuccess: (data) => {},
    onError: (err) => {
      console.log(err);
    }
  });

  const handleClose = () => {
    setOpenBackDrop(false);
  };

  useEffect(() => {
    if (isLoading) {
      setOpenBackDrop(true);
    } else {
      setOpenBackDrop(false);
    }
  }, [isLoading]);

  console.log(respData);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Stack paddingX={{ md: 30, xs: 2 }} padding={2} spacing={2}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Cast Vote" {...a11yProps(0)} />
            <Tab label="Results" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Stack spacing={2}>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bolder", color: "primary.main" }}
            >
              Please cast your vote in each category
            </Typography>
            {data?.categories?.map((category) => {
              return (
                <Stack spacing={2}>
                  {
                    // isSuccess && <AlertPopup open={true} message={respData?}
                  }
                  <Typography fontSize={15} fontWeight="bold">
                    {category.category}{" "}
                    {category.level === "employee"
                      ? `(${"All Fasset Stuff"})`
                      : `(${
                          category.level.charAt(0).toUpperCase() +
                          category.level.slice(1) + 's'
                        })`}
                  </Typography>
                  <Formik
                    initialValues={{
                      categoryId: category.id || "",
                      userVotingEmail: accounts[0].username || "",
                      employeeId: ""
                    }}
                    validationSchema={Yup.object().shape({
                      employeeId: Yup.string().required(
                        "Please select a nominee"
                      )
                    })}
                    enableReinitialize
                    key={category.id}
                    onSubmit={(values) => {
                      mutate(values);
                    }}
                  >
                    {(formik) => {
                      // console.log(formik);
                      return (
                        <Form>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                value={
                                  formik.values.employeeId
                                    ? employeeData?.employees.find(
                                        (emp) =>
                                          emp.id === formik.values.employeeId
                                      )
                                    : null
                                }
                                options={
                                  category.level === "department"
                                    ? filterByType(category.level)
                                    : category.level === "employee"
                                    ? filterAllEmployees(category.level)
                                    : filterByPosition(category.level)
                                }
                                fullWidth
                                getOptionLabel={(option) =>
                                  option ? option.fullName : ""
                                }
                                isOptionEqualToValue={(option, value) => {
                                  return option.id === value.id;
                                }}
                                onChange={(e, value) => {
                                  formik.setFieldValue("employeeId", value.id);
                                }}
                                renderInput={(params) => {
                                  // console.log(params);
                                  return (
                                    <TextField
                                      {...params}
                                      label={"Select nominee"}
                                      placeholder="Select nominee"
                                      error={
                                        formik.touched.employeeId &&
                                        Boolean(formik.errors.employeeId)
                                      }
                                      helperText={
                                        formik.touched.employeeId &&
                                        formik.errors.employeeId
                                      }
                                      onBlur={formik.handleBlur}
                                    />
                                  );
                                }}
                              />
                              {/* <AutoCompleteWrapper
                                name="id"
                                label="Select nominee"
                                defaultValue={values.id || null}
                              /> */}
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Stack direction="row" justifyContent="end">
                                <Button
                                  variant="contained"
                                  sx={{ fontWeight: "bolder" }}
                                  type="submit"
                                  disabled={isLoading && true}
                                >
                                  Nominate & Vote
                                </Button>
                              </Stack>
                            </Grid>
                            <Backdrop
                              sx={{
                                color: "#fff",
                                pointerEvents: "none",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                                borderWidth: 4,
                                borderColor: "primary.main",
                                borderStyle: "solid",
                                backgroundColor: "inherit"
                              }}
                              open={openBackDrop}
                              onClick={handleClose}
                            >
                              <CircularProgress color="primary" />
                            </Backdrop>
                          </Grid>
                        </Form>
                      );
                    }}
                  </Formik>
                </Stack>
              );
            })}
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
      </Box>
    </Stack>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default Vote;
