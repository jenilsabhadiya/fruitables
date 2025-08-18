import { MenuItem, TextField } from "@mui/material";
import React from "react";

function DropDown({
  id,
  name,
  label,
  variant = "standard",
  onChange,
  onBlur,
  error,
  helperText,
  data = [],
}) {
  return (
    <TextField
      margin="dense"
      id={id}
      name={name}
      select
      label={label}
      variant={variant}
      fullWidth
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
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
