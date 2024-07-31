import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
  Alert,
  // Autocomplete,
  // Backdrop,
  Box,
  // Button,
  // CircularProgress,
  // Grid,
  // LinearProgress,
  Stack,
  Tab,
  Tabs
  // TextField,
  // Typography
} from "@mui/material";
import React from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";
import { Navigate } from "react-router-dom";
// import ApiQuery from "../../ApiQuery";
// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import AlertPopup from "../../components/AlertPopup";
import Results from "../../components/Results";

const Vote = () => {
  const [value, setValue] = React.useState(0);
  // const [openBackDrop, setOpenBackDrop] = useState(false);
  const isAuth = useIsAuthenticated();
  const { accounts } = useMsal();

  // const queryClient = useQueryClient();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const { data, isLoading: categoryLoading } = useQuery({
  //   queryKey: ["categories"],
  //   queryFn: () => {
  //     return ApiQuery.getAllCategories();
  //   }
  // });

  // const { data: employeeData } = useQuery({
  //   queryKey: ["employees"],
  //   queryFn: () => {
  //     return ApiQuery.getAllEmployees();
  //   }
  // });

  // const { data: userVotesData } = useQuery({
  //   queryKey: ["userVotes"],
  //   queryFn: () => {
  //     return ApiQuery.getUserVotes(accounts[0]?.username);
  //   },
  //   enabled: !!accounts[0]?.username
  // });

  // const filterByType = (type) => {
  //   return employeeData?.employees?.filter((option) => option.type === type);
  // };

  // const filterByPosition = (position) => {
  //   return employeeData?.employees?.filter(
  //     (option) => option.position?.toLowerCase() === position?.toLowerCase()
  //   );
  // };

  // const filterAllEmployees = (position) => {
  //   return employeeData?.employees?.filter(
  //     (option) =>
  //       option.position?.toLowerCase() !== "intern" &&
  //       option.position?.toLowerCase() !== "department"
  //   );
  // };

  // const filterByGender = (gender) => {
  //   if (gender === "men") {
  //     return employeeData?.employees?.filter((option) => option.gender === "M");
  //   }

  //   if (gender === "woman") {
  //     return employeeData?.employees?.filter((option) => option.gender === "F");
  //   }
  // };

  // console.log(accounts)

  // const {
  //   data: respData,
  //   isError,
  //   error,
  //   isLoading,
  //   mutate,
  //   isSuccess
  // } = useMutation({
  //   mutationFn: (formData) => {
  //     return ApiQuery.castVote(formData);
  //   },
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: ["categories"] });
  //     queryClient.invalidateQueries({ queryKey: ["userVotes"] });
  //     queryClient.invalidateQueries({ queryKey: ["employees"] });
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   }
  // });

  // const handleClose = () => {
  //   setOpenBackDrop(false);
  // };

  // useEffect(() => {
  //   if (isLoading) {
  //     setOpenBackDrop(true);
  //   } else {
  //     setOpenBackDrop(false);
  //   }
  // }, [isLoading]);

  // if (categoryLoading) {
  //   return <LinearProgress />;
  // }

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
            <Tab label="Nominate" {...a11yProps(0)} />
            <Tab label="Vote" {...a11yProps(1)} />
            {(accounts[0].username === "Karabo.Dikgore@fasset.org.za" ||
              accounts[0].username === "Apatame.Rajabu@fasset.org.za" ||
              accounts[0].username === "Banele.Nduli@fasset.org.za" ||
              accounts[0].username === "Ntsebeng.Khoarai@fasset.org.za" ||
              accounts[0].username === "Thabo.Khwenenyana@fasset.org.za") && (
              <Tab label="Results" {...a11yProps(2)} />
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Alert color="error" severity="error">
            Nominations are closed
          </Alert>

          {/* <Stack spacing={2}>
            <Typography
              sx={{ fontSize: 20, fontWeight: "bolder", color: "primary.main" }}
            >
              Please nominate your nominee in each category
            </Typography>
            {data?.categories?.map((category) => {
              return (
                <Stack spacing={2} key={category.id}>
                  {isSuccess && (
                    <AlertPopup open={true} message={respData?.message} />
                  )}
                  {isError && (
                    <AlertPopup
                      severity="error"
                      open={true}
                      message={error?.response?.data?.message}
                    />
                  )}
                  <Typography fontSize={15} fontWeight="bold">
                    {category.category}{" "}
                    {category.level === "employee"
                      ? `(${"All FASSET Staff"})`
                      : `(${
                          category.level.charAt(0).toUpperCase() +
                          category.level.slice(1) +
                          ""
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
                      // console.log(values);
                      mutate(values);
                    }}
                  >
                    {(formik) => {
                      // console.log();
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
                                    : category.level === "men"
                                    ? filterByGender("men")
                                    : category.level === "women"
                                    ? filterByGender("woman")
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
                           
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Stack direction="row" justifyContent="end">
                                <Button
                                  variant="contained"
                                  sx={{ fontWeight: "bolder" }}
                                  type="submit"
                                  disabled={
                                    (isLoading ||
                                      userVotesData?.userVotes.find(
                                        (userVote) =>
                                          userVote.categoryId === category.id
                                      )) &&
                                    true
                                  }
                                >
                                  Nominate
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
          </Stack> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Alert color="info">
            Voting will open soon
          </Alert>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Results />
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
