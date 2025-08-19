import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, FormGroup, Switch } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";
import { array, boolean, date, mixed, number, object, string } from "yup";
import { Form, Formik } from "formik";
import TestInput from "../../components/TestInput/TestInput";
import DropDown from "../../components/DropDown/DropDown";
import RadioButton from "../../components/RadioButton/RadioButton";
import FileUpload from "../../components/FileUpload/FileUpload";
import Checkbox1 from "../../components/Checkbox/Checkbox1";
import SwitchOnOff from "../../components/SwitchOnOff/SwitchOnOff";

function Products() {
  const [open, setOpen] = React.useState(false);

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

        console.log(arr);

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
        console.log(val);

        let type = val.type.toLowerCase();

        if (type === "image/png" || type === "image/jpeg") {
          return true;
        } else {
          return false;
        }
      })
      .test("products_image", "Only 2MB size file allowed", (val) => {
        console.log("eeeeeeeeeeeee", val);
        if (val.size <= 2 * 1024 * 1024) {
          return true;
        } else {
          return false;
        }
      }),
    discount: array().required().min(1),
    status: boolean().oneOf([true], "Status must be active"),
  });

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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Products</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
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
              }}
              validationSchema={productsSchema}
              onSubmit={(values) => {
                console.log(values);
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
