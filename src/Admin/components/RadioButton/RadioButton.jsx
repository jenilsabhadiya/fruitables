import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

function RadioButton({ label, id, data, ...props }) {
  const [field, meta] = useField(props);
  console.log(field, meta);
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
        {...props}
        {...field}
        row
        aria-labelledby={id}
        error={meta.error && meta.touched}
      >
        {data.map((v) => (
          <FormControlLabel
            value={v.value}
            control={<Radio />}
            label={v.label}
          />
        ))}
      </RadioGroup>
      {meta.error && meta.touched ? (
        <p className="error">{meta.error && meta.touched ? meta.error : ""}</p>
      ) : (
        ""
      )}
    </FormControl>
  );
}

export default RadioButton;
