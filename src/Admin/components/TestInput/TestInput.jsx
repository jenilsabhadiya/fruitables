import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

function TestInput({
  id,
  label,
  type = "text",
  variant = "standard",
  multiline = false,
  rows = 0,
  ...props
}) {
  const [field, meta] = useField(props);
  console.log(field, meta);

  return (
    <TextField
      {...props}
      {...field}
      id={id}
      label={label}
      type={type}
      margin="dense"
      fullWidth
      variant={variant}
      multiline={multiline}
      rows={rows}
      error={meta.error && meta.touched}
      helperText={meta.error && meta.touched ? meta.error : ""}
    />
  );
}

export default TestInput;
