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
import DataGridBG from "../../components/DataGridBG/DataGridBG";
import {
  useAddcategaryMutation,
  useDeletecategaryMutation,
  useGetAllcategaryQuery,
  useStatusCategoryMutation,
  useUpdatecategaryMutation,
} from "../../../redux/Api/categary.api";

function Categary() {
  const [open, setOpen] = React.useState(false);
  // const [categaryData, setCategaryData] = useState([]);
  const [update, setUpdate] = useState();

  const { data, error, isLoading } = useGetAllcategaryQuery();
  console.log(data);

  const [addcategary] = useAddcategaryMutation();
  const [deleteCategary] = useDeletecategaryMutation();
  const [updateCategary] = useUpdatecategaryMutation();
  const [statusCategary] = useStatusCategoryMutation();

  // const dispatch = useDispatch();

  // const categarySlice = useSelector((state) => state.categary);
  // console.log(categarySlice);

  // const getData = () => {
  //   dispatch(getAllData());
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "name", headerName: "Name", width: 170 },
    {
      field: "cat_img",
      headerName: "Image",
      width: 170,
      renderCell: (params) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          // src={"../public/assets/img/" + params.row.cat_img}
          src={params.row.cat_img?.url}
        />
      ),
    },
    {
      field: "active",
      headerName: "Status",
      width: 170,
      renderCell: (params) => (
        <Switch
          checked={params.row.active || false}
          // onChange={() => statusCategary(params.row._id)}
          onChange={() =>
            statusCategary({ _id: params.row._id, active: !params.row.active })
          }
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
            onClick={() => deleteCategary(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

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
    cat_img: mixed()
      .required()
      .test("cat_img", "Only png or jpeg file allowed", (val) => {
        // console.log(val);

        if (typeof val?.url === "string") {
          return true;
        }

        let type = val.type.toLowerCase();
        if (type === "image/png" || type === "image/jpeg") {
          return true;
        } else {
          return false;
        }
      })
      .test("cat_img", "Only 2MB size file allowed", (val) => {
        // console.log("eeeeeeeeeeeee", val);

        if (typeof val?.url === "string") {
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

  // const handleCategarySubmit = (data) => {
  //   dispatch(addCategary(data));
  // };

  // const handleDelete = (id) => {
  //   dispatch(deleteCategary(id));
  // };

  const handleEdit = (data) => {
    console.log(data);
    setUpdate(data);
    handleClickOpen();
  };

  // const handleUpdate = (data) => {
  //   let updateData = [];

  //   if (typeof data.cat_img === "string") {
  //     updateData = { ...data };
  //   } else {
  //     updateData = {
  //       ...data,
  //       cat_img: data.cat_img.name,
  //     };
  //   }
  //   dispatch(updateCategary(updateData));
  // };

  // const handleStatus = (data) => {
  //   ststusCategary(data);
  //   console.log(data, "data");
  // };

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

          <Button variant="outlined" onClick={handleClickOpen} sx={{ my: 2 }}>
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
                      cat_img: "",
                      active: true,
                    }
              }
              validationSchema={categarySchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                let formData = new FormData();
                Object.entries(values).map(([key, val]) => {
                  console.log("key, val", key, val);

                  if (key === "cat_img") {
                    if (val instanceof File) {
                      formData.append(key, val);
                    }
                  } else {
                    formData.append(key, val);
                  }
                });

                if (update) {
                  updateCategary({ _id: values._id, body: formData });
                } else {
                  // handleCategarySubmit(values);
                  addcategary(formData);
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

                <FileUpload type="file" name="cat_img" />

                <SwitchOnOff
                  id="active"
                  name="active"
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

      {/* <DataGrid
        rows={categarySlice.categary}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      /> */}

      {/* <DataGridBG rows={categarySlice.categary} columns={columns} /> */}

      <DataGridBG rows={data?.data} columns={columns} />
    </div>
  );
}

export default Categary;
