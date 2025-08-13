import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { Formik, useFormik } from "formik";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function SubCategary() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  let SubCategarySchema = object({
    name: string().required("Please enter Name:"),
    description: string().required("Please enter Description:"),
    SubCategarySelect: string().required("Please select a SubCategary:"),
  });

  const formikObj = useFormik({
    initialValues: {
      name: "",
      description: "",
      SubCategarySelect: "",
    },
    validationSchema: SubCategarySchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    touched,
    resetForm,
  } = formikObj;

  // console.log(errors, touched);

  const currencies = [
    {
      value: "food",
      label: "Food",
    },
    {
      value: "food1",
      label: "Food1",
    },
    {
      value: "Food2",
      label: "Food2",
    },
  ];
  return (
    <div>
      <h2>SubCategary</h2>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <h2>SubCategary</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add SubCategary
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>SubCategary</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
                error={errors.SubCategarySelect && touched.SubCategarySelect}
                id="SubCategarySelect"
                select
                label="SubCategary-select"
                // defaultValue="food"
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={values.SubCategarySelect}
                onBlur={handleBlur}
                helperText={
                  errors.SubCategarySelect && touched.SubCategarySelect
                    ? errors.SubCategarySelect
                    : ""
                }
              >
                {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                error={errors.name && touched.name}
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                value={values.name}
                onBlur={handleBlur}
                helperText={errors.name && touched.name ? errors.name : ""}
              />

              <TextField
                error={errors.description && touched.description}
                id="description"
                label="Description"
                multiline
                fullWidth
                rows={4}
                defaultValue="Default Value"
                variant="standard"
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
              />

              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" form="subscription-form">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default SubCategary;
