import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton, Switch } from "@mui/material";
import { date, mixed, number, object, string } from "yup";
import { Form, Formik } from "formik";
import TestInput from "../../components/TestInput/TestInput";
import DataGridBG from "../../components/DataGridBG/DataGridBG";
import Heading from "../../components/Heading/Heading";
import {
  useAddcouponMutation,
  useDeletecouponMutation,
  useGetAllcouponQuery,
  useStatusCouponMutation,
  useUpdatecouponMutation,
} from "../../../redux/Api/coupon.api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileUpload from "../../components/FileUpload/FileUpload";
import SwitchOnOff from "../../components/SwitchOnOff/SwitchOnOff";

function Coupon() {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState();

  const [addcoupon] = useAddcouponMutation();
  const [deletecoupon] = useDeletecouponMutation();
  const [updatecoupon] = useUpdatecouponMutation();
  const [statusCoupon] = useStatusCouponMutation();

  const { data, error, isLoading } = useGetAllcouponQuery();
  console.log("data", data?.data);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "coupon", headerName: "Coupon", width: 200 },
    { field: "percentage", headerName: "Percentage", width: 200 },
    { field: "expiry", headerName: "Expiry", width: 200 },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "coupon_image",
      headerName: "Image",
      width: 70,
      renderCell: (params) => (
        <img
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
          // src={"../public/assets/img/" + params.row.coupon_image}
          src={params.row.coupon_image?.url}
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
          onChange={() =>
            statusCoupon({ _id: params.row._id, active: !params.row.active })
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
            onClick={() => deletecoupon(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (data) => {
    console.log(data);
    setUpdate(data);
    handleClickOpen();
  };

  let couponSchema = object({
    coupon: string().required(),
    percentage: number().required(),
    expiry: date().required(),
    stock: number().required(),
    coupon_image: mixed()
      .required()
      .test("coupon_image", "Only png or jpeg file allowed", (val) => {
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
      .test("coupon_image", "Only 2MB size file allowed", (val) => {
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

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "50px",
        }}
      >
        <Heading title={"Coupon"} />

        <Button variant="outlined" onClick={handleClickOpen} sx={{ my: 2 }}>
          Add Coupon
        </Button>
      </Box>
      <DataGridBG rows={data?.data} columns={columns} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Coupon</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={
              update
                ? update
                : {
                    coupon: "",
                    percentage: "",
                    expiry: "",
                    stock: "",
                    active: true,
                    coupon_image: "",
                  }
            }
            validationSchema={couponSchema}
            onSubmit={(values, { resetForm }) => {
              console.log("values", values, Object.entries(values));

              let formData = new FormData();
              Object.entries(values).map(([key, val]) => {
                console.log("key, val", key, val);

                if (key === "coupon_image") {
                  if (val instanceof File) {
                    formData.append(key, val);
                  }
                } else {
                  formData.append(key, val);
                }
              });

              if (update) {
                // handleUpdate(values);

                // let updateData = [];

                // if (typeof values.coupon_image === "string") {
                //   updateData = { ...values };
                // } else {
                //   updateData = {
                //     ...values,
                //     coupon_image: values.coupon_image.name,
                //   };
                // }

                updatecoupon({ _id: values._id, body: formData });
              } else {
                // handleCategarySubmit(values);

                addcoupon(formData);
              }

              resetForm();
              handleClose();
            }}
          >
            <Form id="coupon-form">
              <TestInput id="coupon" name="coupon" label="Coupon:-" />

              <TestInput
                id="percentage"
                name="percentage"
                label="Percentage:-"
                type="number"
              />

              <TestInput
                id="expiry"
                name="expiry"
                label="Expiry :-"
                type="date"
              />

              <TestInput
                id="stock"
                name="stock"
                label="Stcok:-"
                type="number"
              />

              <SwitchOnOff
                id="active"
                name="active"
                label="Active or Not Active"
              />

              <FileUpload type="file" name="coupon_image" />
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="coupon-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Coupon;
