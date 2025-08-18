import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

function RadioButton({
  label,
  id,
  name,
  onChange,
  onBlur,
  error,
  data,
  helperText,
}) {
  return (
    <FormControl
      style={{
        marginTop: "20px",
        display: "block",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <FormLabel id={id}>{label}:-</FormLabel>
      <RadioGroup
        row
        aria-labelledby={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
      >
        {data.map((v) => (
          <FormControlLabel
            value={v.value}
            control={<Radio />}
            label={v.label}
          />
        ))}
      </RadioGroup>
      {error ? <p className="error">{helperText}</p> : ""}
    </FormControl>
  );
}

export default RadioButton;
