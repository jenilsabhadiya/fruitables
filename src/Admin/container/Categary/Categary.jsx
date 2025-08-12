import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { DataGrid } from "@mui/x-data-grid";
import { object, string } from "yup";
import { Formik, useFormik } from "formik";
import { Box } from "@mui/material";

function Categary() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  let categarySchema = object({
    name: string().required("Please enter Name:"),
    description: string().required("Please enter Description:"),
  });

  const formikObj = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: categarySchema,
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

  return (
    <div>
      <React.Fragment>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <h2>Categary</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Categary
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Categary</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit} id="subscription-form">
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

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Categary;
