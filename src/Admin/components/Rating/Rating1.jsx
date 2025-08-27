import { FormLabel, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useField } from "formik";
import React from "react";

function Rating1({ id, label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      <Stack spacing={1}>
        <FormLabel id={id}>{label}</FormLabel>
        <Rating {...props} {...field} defaultValue={1} precision={0.5} />
        {meta.error && meta.touched ? (
          <p className="error">
            {meta.error && meta.touched ? meta.error : ""}
          </p>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}

export default Rating1;
