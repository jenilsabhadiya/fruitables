import { FormControlLabel, FormGroup, FormLabel, Switch } from "@mui/material";
import { useField } from "formik";
import React from "react";

function SwitchOnOff({ id, label, ...props }) {
  const [field, meta] = useField(props);
  console.log(field, meta);
  return (
    <>
      <FormGroup>
        <FormLabel id={id}>{label}</FormLabel>
        <FormControlLabel
          control={<Switch {...field} {...props} />}
          label={label}
          error={meta.error && meta.touched}
        />
        {meta.error && meta.touched ? (
          <p className="error">
            {meta.error && meta.touched ? meta.error : ""}
          </p>
        ) : (
          ""
        )}
      </FormGroup>
    </>
  );
}

export default SwitchOnOff;
