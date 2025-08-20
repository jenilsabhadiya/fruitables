import { MenuItem, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

function DropDown({ id, label, variant = "standard", data = [], ...props }) {
  const [field, meta] = useField(props);
  // console.log(field, meta);

  return (
    <TextField
      {...props}
      {...field}
      margin="dense"
      id={id}
      select
      label={label}
      variant={variant}
      fullWidth
      error={meta.error && meta.touched}
      helperText={meta.error && meta.touched ? meta.error : ""}
    >
      {data.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default DropDown;
