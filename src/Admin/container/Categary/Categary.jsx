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
import { useDispatch, useSelector } from "react-redux";
import {
  addCategary,
  deleteCategary,
  getAllData,
  updateCategary,
  updateStatus,
} from "../../../redux/slice/categary.slice";
import Heading from "../../components/Heading/Heading";

function Categary() {
  const [open, setOpen] = React.useState(false);
  // const [categaryData, setCategaryData] = useState([]);
  const [update, setUpdate] = useState();

  const dispatch = useDispatch();

  const categarySlice = useSelector((state) => state.categary);
  console.log(categarySlice);

  const getData = () => {
    dispatch(getAllData());
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
    dispatch(addCategary(data));
  };

  const handleDelete = (id) => {
    dispatch(deleteCategary(id));
  };

  const handleEdit = (data) => {
    console.log(data);
    setUpdate(data);
    handleClickOpen();
  };

  const handleUpdate = (data) => {
    let updateData = [];

    if (typeof data.categary_image === "string") {
      updateData = { ...data };
    } else {
      updateData = {
        ...data,
        categary_image: data.categary_image.name,
      };
    }
    dispatch(updateCategary(updateData));
  };

  const handleStatus = (data) => {
    dispatch(updateStatus(data));
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
          <Heading title={"Categary"} />

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
        rows={categarySlice.categary}
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
