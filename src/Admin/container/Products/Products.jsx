import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormGroup, IconButton, Switch } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";
import { array, date, mixed, number, object, string } from "yup";
import { Form, Formik } from "formik";
import TestInput from "../../components/TestInput/TestInput";
import DropDown from "../../components/DropDown/DropDown";
import RadioButton from "../../components/RadioButton/RadioButton";
import FileUpload from "../../components/FileUpload/FileUpload";
import Checkbox1 from "../../components/Checkbox/Checkbox1";
import SwitchOnOff from "../../components/SwitchOnOff/SwitchOnOff";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
function Products() {
  const [open, setOpen] = React.useState(false);
  const [productsData, setProductsData] = useState([]);
  const [update, setUpdate] = useState();

  const getData = () => {
    const localProductsData =
      JSON.parse(localStorage.getItem("products")) || [];
    console.log(localProductsData);

    setProductsData(localProductsData);
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

  const subcategary = [
    {
      value: "summer fruits",
      label: "Summer Fruits",
    },
    {
      value: "winter fruits",
      label: "Winter Fruits",
    },
    {
      value: "seasonal fruit",
      label: "Seasonal fruit",
    },
  ];

  let productsSchema = object({
    categary: string().required(),
    subcategary: string().required(),
    name: string()
      .required()
      .matches(/^[a-zA-Z ]+$/, "Only alphabets are allowed"),
    password: string()
      .required()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[A-Za-z0-9])(?=.*?[!@#$%^&*]).{6,16}$/,
        "Password must be 6-16 characters long and contain alphabets, numbers, and special characters"
      ),
    rpassword: string()
      .required()
      .test("rpassword", "Passwords not  match", function (val) {
        if (val === this.parent.password) {
          return true;
        } else {
          return false;
        }
      }),
    jd: date().required().max(new Date(), "Future date not allowed"),
    description: string()
      .required()
      .test("description", "Max 30 word allowed", (val) => {
        const arr = val.split(" ");

        // console.log(arr);

        if (arr.length <= 5) {
          return true;
        } else {
          return false;
        }
      }),
    price: number().required().positive().integer(),
    type: string().required(),
    products_image: mixed()
      .required()
      .test("products_image", "Only png or jpeg file allowed", (val) => {
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
      .test("products_image", "Only 2MB size file allowed", (val) => {
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
    discount: array().required().min(1),
    // status: boolean().oneOf([true], "Status must be active"),
  });

  const handleProuctsSubmit = (data) => {
    console.log(data);

    const localProductsData =
      JSON.parse(localStorage.getItem("products")) || [];

    console.log(localProductsData);

    delete data.rpassword.name;

    localProductsData.push({
      ...data,
      products_image: data.products_image.name,
      id: Math.floor(Math.random() * 1000),
    });

    localStorage.setItem("products", JSON.stringify(localProductsData));
    console.log(localProductsData);

    setProductsData(localProductsData);
  };

  const handleEdit = (data) => {
    console.log(data);
    setUpdate(data);
    handleClickOpen();
  };

  const handleDelete = (id) => {
    console.log(id);
    const localProductsData = JSON.parse(localStorage.getItem("products"));

    const index = localProductsData.findIndex((v) => v.id === id);
    console.log(index);

    localProductsData.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(localProductsData));

    setProductsData(localProductsData);
  };

  const columns = [
    { field: "categary", headerName: "Categary", width: 70 },
    { field: "subcategary", headerName: "Subcategary", width: 70 },
    { field: "name", headerName: "Name", width: 70 },
    { field: "jd", headerName: "JD", width: 70 },
    { field: "price", headerName: "Price", width: 70 },
    { field: "type", headerName: "Type", width: 70 },
    {
      field: "products_image",
      headerName: "Image",
      width: 70,
      renderCell: (params) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          src={"../public/assets/img/" + params.row.products_image}
        />
      ),
    },
    { field: "discount", headerName: "Discount", width: 70 },
    {
      field: "status",
      headerName: "Status",
      width: 70,
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

  const handleUpdate = (data) => {
    const localProductsData = JSON.parse(localStorage.getItem("products"));

    console.log(data);

    const index = localProductsData.findIndex((v) => v.id === data.id);

    if (typeof data === "string") {
      localProductsData[index] = data;
    } else {
      localProductsData[index] = {
        ...data,
        products_image: data.products_image.name,
      };
    }

    localStorage.setItem("products", JSON.stringify(localProductsData));
    setProductsData(localProductsData);
    setUpdate();
  };

  const handleStatus = (data) => {
    console.log(data);

    const localProductsData = JSON.parse(localStorage.getItem("products"));

    const index = localProductsData.findIndex((v) => v.id === data.id);

    localProductsData[index] = { ...data, status: !data.status };

    localStorage.setItem("products", JSON.stringify(localProductsData));
    setProductsData(localProductsData);
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
          <h2>Products</h2>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Products
          </Button>
        </Box>
        <DataGrid
          rows={productsData}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Products</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={
                update
                  ? {
                      ...update,
                      rpassword: update.password,
                    }
                  : {
                      categary: "",
                      subcategary: "",
                      name: "",
                      password: "",
                      rpassword: "",
                      jd: "",
                      description: "",
                      price: "",
                      type: "",
                      products_image: null,
                      discount: [],
                      status: false,
                    }
              }
              validationSchema={productsSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);

                if (update) {
                  handleUpdate(values);
                } else {
                  handleProuctsSubmit(values);
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

                <DropDown
                  id="subcategary"
                  name="subcategary"
                  select
                  label="Select SubCategary"
                  data={subcategary}
                />

                <TestInput id="name" name="name" label="Name:-" />

                <TestInput
                  id="password"
                  name="password"
                  label="Password:-"
                  type="password"
                />

                <TestInput
                  id="rpassword"
                  name="rpassword"
                  label="Repeat Password:-"
                  type="password"
                />

                <FormLabel id="date_label" style={{ marginTop: "20px" }}>
                  Joining Date:
                </FormLabel>

                <TestInput id="jd" name="jd" type="date" />

                <TestInput
                  id="description"
                  label="Description"
                  name="description"
                  multiline={true}
                  rows={4}
                />

                <TestInput
                  id="price"
                  name="price"
                  label="Price:-"
                  type="number"
                />

                <RadioButton
                  label="Type"
                  id="type_label"
                  name="type"
                  data={[
                    { value: "organic", label: "Organic" },
                    { value: "not_organic", label: "Not Organic" },
                  ]}
                />

                <FileUpload type="file" name="products_image" />

                <Checkbox1 id="Discount" name="discount" label="Yes" />

                <SwitchOnOff
                  id="active"
                  name="status"
                  label="Active or Not Active"
                  // checked={values.status}
                />
              </Form>
            </Formik>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" form="subscription-form">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}

export default Products;
