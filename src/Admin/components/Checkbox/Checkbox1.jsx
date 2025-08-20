import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

function Checkbox1({ id, label, ...props }) {
  const [field, meta] = useField(props);
  // console.log(field, meta);

  return (
    <>
      <FormGroup>
        <FormLabel id={id}>{id}</FormLabel>
        <FormControlLabel
          control={<Checkbox value={"yes"} />}
          label={label}
          {...props}
          {...field}
          checked={field.value || false}
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

export default Checkbox1;
