import { Autocomplete, TextField, Typography } from "@mui/material";
import { useField } from "formik";
import React from "react";

const AutoCompleteWrapper = ({ name, label, options, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined"
  };

  if (meta?.touched && meta?.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      {...configTextField}
      getOptionLabel={(option) => (option ? option.fullName : "")}
      isOptionEqualToValue={(option, value) => {
        return option.id === value.id
      }}
      renderInput={(params) => {
        return (
          <TextField {...params} label={label} placeholder="Select nominee" />
        );
      }}
    />
  );
};

export default AutoCompleteWrapper;
