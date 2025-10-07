import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import {
  addTastimonial,
  deleteTastimonial,
  getAllData,
  updateTastimonial,
} from "../../../redux/slice/tastimonial.slice";
import Rating1 from "../../components/Rating/Rating1";

function Tastimonial() {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState();

  const dispatch = useDispatch();

  const tastimonialData = useSelector((state) => state.tastimonial);
  console.log(tastimonialData);

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
      field: "tastimonial_image",
      headerName: "Image",
      width: 170,
      renderCell: (params) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          src={"../public/assets/img/" + params.row.tastimonial_image}
        />
      ),
    },
    {
      field: "profession",
      headerName: "Profession",
      width: 170,
    },
    {
      field: "half_rating",
      headerName: "Rating",
      width: 170,
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

  let tastimonialSchema = object({
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
    profession: string()
      .required()
      .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed"),
    tastimonial_image: mixed()
      .required()
      .test("tastimonial_image", "Only png or jpeg file allowed", (val) => {
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
      .test("tastimonial_image", "Only 2MB size file allowed", (val) => {
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
    half_rating: mixed()
      .required()
      .test("half_rating", "Rating must be between 0.5 and 5", (value) => {
        return value >= 0.5 && value <= 5;
      }),
  });

  const handleTastimonialSubmit = (data) => {
    dispatch(addTastimonial(data));
  };

  const handleDelete = (id) => {
    dispatch(deleteTastimonial(id));
  };

  const handleEdit = (data) => {
    console.log(data);
    setUpdate(data);
    handleClickOpen();
  };

  const handleUpdate = (data) => {
    let updateData = [];

    if (typeof data.tastimonial_image === "string") {
      updateData = { ...data };
    } else {
      updateData = {
        ...data,
        tastimonial_image: data.tastimonial_image.name,
      };
    }
    dispatch(updateTastimonial(updateData));
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
          <h2>Tastimonial</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Tastimonial
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Tastimonial</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={
                update
                  ? update
                  : {
                      name: "",
                      description: "",
                      profession: "",
                      tastimonial_image: "",
                      half_rating: 1,
                    }
              }
              validationSchema={tastimonialSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                if (update) {
                  handleUpdate(values);
                } else {
                  handleTastimonialSubmit(values);
                }

                resetForm();
                handleClose();
              }}
            >
              <Form id="tastimonial-form">
                <TestInput id="name" name="name" label="Name:-" />

                <TestInput
                  id="description"
                  label="Description"
                  name="description"
                  multiline={true}
                  rows={4}
                />

                <TestInput
                  id="profession"
                  name="profession"
                  label="Profession:-"
                />

                <FileUpload type="file" name="tastimonial_image" />

                <Rating1 id="half_rating" name="half_rating" label="Rating:-" />

                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" form="tastimonial-form">
                    Submit
                  </Button>
                </DialogActions>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>
      </React.Fragment>

      <DataGrid
        rows={tastimonialData.tastimonial}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default Tastimonial;
