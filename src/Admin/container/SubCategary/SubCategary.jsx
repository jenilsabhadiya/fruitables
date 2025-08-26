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
import DropDown from "../../components/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  addsubCategary,
  deletesubCategary,
  getAllData,
  updateStatus,
  updatesubCategary,
} from "../../../redux/slice/subCategary.slice";

function SubCategary() {
  const [open, setOpen] = React.useState(false);
  // const [subcategaryData, setSubCategaryData] = useState([]);
  const [update, setUpdate] = useState();

  const dispatch = useDispatch();

  const subCategarySlice = useSelector((state) => state.subCategary);
  console.log(subCategarySlice);

  const categarySlice = useSelector((state) => state.categary);
  console.log(categarySlice.categary);

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
    { field: "categary", headerName: "Categary", width: 170 },
    { field: "name", headerName: "Name", width: 170 },
    {
      field: "sub_categary_image",
      headerName: "Image",
      width: 170,
      renderCell: (params) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          src={"../public/assets/img/" + params.row.sub_categary_image}
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

  let subcategarySchema = object({
    categary: string().required(),
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
    sub_categary_image: mixed()
      .required()
      .test("sub_categary_image", "Only png or jpeg file allowed", (val) => {
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
      .test("sub_categary_image", "Only 2MB size file allowed", (val) => {
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

  const handleCategarySubmit = (data) => {
    dispatch(addsubCategary(data));
  };

  const handleDelete = (id) => {
    dispatch(deletesubCategary(id));
  };

  const handleEdit = (data) => {
    console.log(data);
    setUpdate(data);
    handleClickOpen();
  };

  const handleUpdate = (data) => {
    let updateData = [];

    if (typeof data.sub_categary_image === "string") {
      updateData = { ...data };
    } else {
      updateData = {
        ...data,
        sub_categary_image: data.sub_categary_image.name,
      };
    }
    dispatch(updatesubCategary(updateData));
  };

  const handleStatus = (data) => {
    dispatch(updateStatus(data));
  };

  const categary = [
    {
      value: "fruits",
      label: "Fruits",
    },
    {
      value: "vegetable",
      label: "Vegetable",
    },
    {
      value: "dry fruits",
      label: "Dry Fruits",
    },
  ];

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
          <h2>Sub Categary</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Sub Categary
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Sub Categary</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={
                update
                  ? update
                  : {
                      categary: "",
                      name: "",
                      description: "",
                      sub_categary_image: "",
                    }
              }
              validationSchema={subcategarySchema}
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
                <DropDown
                  id="categary"
                  name="categary"
                  select
                  label="Select Categary"
                  data={categary}
                />

                <TestInput id="name" name="name" label="Name:-" />

                <TestInput
                  id="description"
                  label="Description"
                  name="description"
                  multiline={true}
                  rows={4}
                />

                <FileUpload type="file" name="sub_categary_image" />

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
        rows={subCategarySlice.subCategary}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default SubCategary;
