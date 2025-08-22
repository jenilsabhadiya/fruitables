import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { DataGrid } from "@mui/x-data-grid";
import { mixed, object, string } from "yup";
import { Form, Formik } from "formik";
import { Box, IconButton, Switch } from "@mui/material";
import TestInput from "../../components/TestInput/TestInput";
import FileUpload from "../../components/FileUpload/FileUpload";
import SwitchOnOff from "../../components/SwitchOnOff/SwitchOnOff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Categary() {
  const [open, setOpen] = React.useState(false);
  const [categaryData, setCategaryData] = useState([]);
  const [update, setUpdate] = useState();

  const getData = () => {
    const localData = JSON.parse(localStorage.getItem("categary")) || [];
    console.log(localData);

    setCategaryData(localData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 170 },
    {
      field: "categary_image",
      headerName: "Image",
      width: 170,
      renderCell: (params) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          src={"../public/assets/img/" + params.row.categary_image}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 170,
      renderCell: (params) => (
        <Switch
          checked={params.row.status || false}
          onChange={() => handleStatus(params.row)}
        />
      ),
    },
    {
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  let categarySchema = object({
    name: string()
      .required()
      .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed"),
    description: string()
      .required()
      .test("description", "Max 5 word allowed", (val) => {
        const arr = val.split(" ");
        // console.log(arr);

        if (arr.length <= 5) {
          return true;
        } else {
          return false;
        }
      }),
    categary_image: mixed()
      .required()
      .test("categary_image", "Only png or jpeg file allowed", (val) => {
        // console.log(val);

        if (typeof val === "string") {
          return true;
        }

        let type = val.type.toLowerCase();
        if (type === "image/png" || type === "image/jpeg") {
          return true;
        } else {
          return false;
        }
      })
      .test("categary_image", "Only 2MB size file allowed", (val) => {
        // console.log("eeeeeeeeeeeee", val);

        if (typeof val === "string") {
          return true;
        }

        if (val.size <= 2 * 1024 * 1024) {
          return true;
        } else {
          return false;
        }
      }),
  });

  // const formikObj = useFormik({
  //   initialValues: {
  //     name: "",
  //     description: "",
  //   },
  //   validationSchema: categarySchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  // const {
  //   handleSubmit,
  //   handleBlur,
  //   handleChange,
  //   values,
  //   errors,
  //   touched,
  //   resetForm,
  // } = formikObj;

  // console.log(errors, touched);

  const handleCategarySubmit = (data) => {
    console.log(data);

    const localData = JSON.parse(localStorage.getItem("categary")) || [];

    console.log(localData);

    localData.push({
      ...data,
      categary_image: data.categary_image.name,
      id: Math.floor(Math.random() * 1000),
    });

    localStorage.setItem("categary", JSON.stringify(localData));
    console.log(localData);

    setCategaryData(localData);
  };

  const handleDelete = (id) => {
    console.log(id);
    const localData = JSON.parse(localStorage.getItem("categary"));
    console.log(localData);

    const index = localData.findIndex((v) => v.id === id);
    console.log(index);

    localData.splice(index, 1);
    localStorage.setItem("categary", JSON.stringify(localData));

    setCategaryData(localData);
  };

  const handleEdit = (data) => {
    console.log(data);
    setUpdate(data);
    handleClickOpen();
  };

  const handleUpdate = (data) => {
    const localData = JSON.parse(localStorage.getItem("categary"));

    console.log(data);

    const index = localData.findIndex((v) => v.id === data.id);

    if (typeof data.categary_image === "string") {
      localData[index] = data;
    } else {
      localData[index] = {
        ...data,
        categary_image: data.categary_image.name,
      };
    }

    localStorage.setItem("categary", JSON.stringify(localData));
    setCategaryData(localData);
    setUpdate();
  };

  const handleStatus = (data) => {
    console.log(data);

    const localData = JSON.parse(localStorage.getItem("categary"));

    const index = localData.findIndex((v) => v.id === data.id);

    localData[index] = { ...data, status: !data.status };

    localStorage.setItem("categary", JSON.stringify(localData));
    setCategaryData(localData);
  };

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
            <Formik
              initialValues={
                update
                  ? update
                  : {
                      name: "",
                      description: "",
                      categary_image: "",
                    }
              }
              validationSchema={categarySchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                if (update) {
                  handleUpdate(values);
                } else {
                  handleCategarySubmit(values);
                }

                resetForm();
                handleClose();
              }}
            >
              <Form id="subscription-form">
                <TestInput id="name" name="name" label="Name:-" />

                <TestInput
                  id="description"
                  label="Description"
                  name="description"
                  multiline={true}
                  rows={4}
                />

                <FileUpload type="file" name="categary_image" />

                <SwitchOnOff
                  id="active"
                  name="status"
                  label="Active or Not Active"
                />

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" form="subscription-form">
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>
      </React.Fragment>

      <DataGrid
        rows={categaryData}
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
