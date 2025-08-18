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
import { useFormik } from "formik";
import TestInput from "../../components/TestInput/TestInput";
import DropDown from "../../components/DropDown/DropDown";
import RadioButton from "../../components/RadioButton/RadioButton";

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
        let type = val.type.toLowerCase();

        if (type === "image/png" || type === "image/jpeg") {
          return true;
        } else {
          return false;
        }
      })
      .test("products_image", "Only 2MB size file allowed", (val) => {
        console.log(val);
        if (val.size <= 2 * 1024 * 1024) {
          return true;
        } else {
          return false;
        }
      }),
    discount: array().required().min(1),
    status: boolean().oneOf([true], "Status must be active"),
  });

  const formik = useFormik({
    initialValues: {
      categary: "",
      subcategary: "",
      name: "",
      password: "",
      rpassword: "",
      jd: "",
      description: "",
      price: "",
      type: "",
      products_image: "",
      discount: [],
      status: false,
    },
    validationSchema: productsSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  console.log(errors, values);

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
            <form onSubmit={handleSubmit} id="subscription-form">
              {/* <TextField
                id="categary"
                margin="dense"
                name="categary"
                select
                label="Select Categary"
                variant="standard"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.categary && touched.categary}
                helperText={
                  errors.categary && touched.categary ? errors.categary : ""
                }
              >
                {categary.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}

              <DropDown
                id="categary"
                margin="dense"
                name="categary"
                select
                label="Select Categary"
                variant="standard"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.categary && touched.categary}
                helperText={
                  errors.categary && touched.categary ? errors.categary : ""
                }
                data={categary}
              />

              {/* <TextField
                id="subcategary"
                name="subcategary"
                margin="dense"
                select
                label="Select SubCategary"
                variant="standard"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.subcategary && touched.subcategary}
                helperText={
                  errors.subcategary && touched.subcategary
                    ? errors.subcategary
                    : ""
                }
              >
                {subcategary.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}

              <DropDown
                id="subcategary"
                name="subcategary"
                margin="dense"
                select
                label="Select SubCategary"
                variant="standard"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.subcategary && touched.subcategary}
                helperText={
                  errors.subcategary && touched.subcategary
                    ? errors.subcategary
                    : ""
                }
                data={subcategary}
              />

              {/* <TextField
                margin="dense"
                id="name"
                name="name"
                label="Name:-"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name ? errors.name : ""}
              /> */}

              <TestInput
                id="name"
                name="name"
                label="Name:-"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name && touched.name}
                helperText={errors.name && touched.name ? errors.name : ""}
              />

              {/* <TextField
                margin="dense"
                id="password"
                name="password"
                label="Password:-"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password ? errors.password : ""
                }
              /> */}

              <TestInput
                id="password"
                name="password"
                label="Password:-"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password ? errors.password : ""
                }
              />

              {/* <TextField
                margin="dense"
                id="rpassword"
                name="rpassword"
                label="Repeat Password:-"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.rpassword && touched.rpassword}
                helperText={
                  errors.rpassword && touched.rpassword ? errors.rpassword : ""
                }
              /> */}

              <TestInput
                id="rpassword"
                name="rpassword"
                label="Repeat Password:-"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.rpassword && touched.rpassword}
                helperText={
                  errors.rpassword && touched.rpassword ? errors.rpassword : ""
                }
              />

              <FormLabel id="date_label" style={{ marginTop: "20px" }}>
                Joining Date:
              </FormLabel>
              {/* <TextField
                margin="dense"
                id="jd"
                name="jd"
                type="date"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.jd && touched.jd}
                helperText={errors.jd && touched.jd ? errors.jd : ""}
              /> */}

              <TestInput
                id="jd"
                name="jd"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.jd && touched.jd}
                helperText={errors.jd && touched.jd ? errors.jd : ""}
              />

              {/* <TextField
                id="description"
                label="Description"
                name="description"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description && touched.description}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
              /> */}

              <TestInput
                id="description"
                label="Description"
                name="description"
                multiline={true}
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description && touched.description}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
              />

              {/* <TextField
                margin="dense"
                id="price"
                name="price"
                label="Price:-"
                type="number"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.price && touched.price}
                helperText={errors.price && touched.price ? errors.price : ""}
              /> */}

              <TestInput
                id="price"
                name="price"
                label="Price:-"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.price && touched.price}
                helperText={errors.price && touched.price ? errors.price : ""}
              />

              {/* <FormControl
                style={{
                  marginTop: "20px",
                  display: "block",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <FormLabel id="type_label">type:-</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="type_label"
                  name="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.type && touched.type}
                >
                  <FormControlLabel
                    value="organic "
                    control={<Radio />}
                    label="Organic "
                  />
                  <FormControlLabel
                    value="not organic "
                    control={<Radio />}
                    label="Not Organic "
                  />
                </RadioGroup>
                {errors.type && touched.type ? (
                  <p className="error">{errors.type}</p>
                ) : (
                  ""
                )}
              </FormControl> */}

              <RadioButton
                label="Type"
                id="type_label"
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.type && touched.type}
                data={[
                  { value: "organic", label: "Organic" },
                  { value: "not_organic", label: "Not Organic" },
                ]}
                helperText={errors.type && touched.type ? errors.type : ""}
              />

              <FormControl
                style={{
                  display: "block",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <FormLabel
                  id="Upload_Image"
                  style={{
                    display: "block",
                  }}
                >
                  Upload Image:-
                </FormLabel>

                <input
                  type="file"
                  name="products_image"
                  onBlur={handleBlur}
                  onChange={(event) =>
                    setFieldValue("products_image", event.target.files[0])
                  }
                />
                {errors.products_image && touched.products_image ? (
                  <p className="error">{errors.products_image}</p>
                ) : (
                  ""
                )}
              </FormControl>

              <FormGroup>
                <FormLabel id="discount">Discount</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={"yes"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  }
                  label="Yes"
                  name="discount"
                />
                {errors.discount && touched.discount ? (
                  <p className="error">{errors.discount}</p>
                ) : (
                  ""
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel id="active">Active</FormLabel>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Active or Not Active"
                  name={"status"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.status}
                />
                {errors.status && touched.status ? (
                  <p className="error">{errors.status}</p>
                ) : (
                  ""
                )}
              </FormGroup>
            </form>
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
