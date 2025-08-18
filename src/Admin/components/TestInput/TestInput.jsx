import { TextField } from "@mui/material";
import React from "react";

function TestInput({
  id,
  name,
  label,
  type = "text",
  variant = "standard",
  onChange,
  onBlur,
  error,
  helperText,
  multiline = false,
  rows = 0,
}) {
  return (
    <TextField
      margin="dense"
      id={id}
      name={name}
      label={label}
      type={type}
      fullWidth
      variant={variant}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={rows}
    />
  );
}

export default TestInput;
