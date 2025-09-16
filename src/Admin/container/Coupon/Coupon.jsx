import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, IconButton } from "@mui/material";
import { date, number, object, string } from "yup";
import { Form, Formik } from "formik";
import TestInput from "../../components/TestInput/TestInput";
import DataGridBG from "../../components/DataGridBG/DataGridBG";
import Heading from "../../components/Heading/Heading";
import {
  useAddcouponMutation,
  useDeletecouponMutation,
  useGetAllcouponQuery,
  useUpdatecouponMutation,
} from "../../../redux/Api/coupon.api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Coupon() {
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = useState();

  const [addcoupon] = useAddcouponMutation();
  const [deletecoupon] = useDeletecouponMutation();
  const [updatecoupon] = useUpdatecouponMutation();

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
      headerName: "Action",
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deletecoupon(params.row.id)}
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
  });

  const { data, error, isLoading } = useGetAllcouponQuery();
  console.log(data);

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
      <DataGridBG rows={data} columns={columns} />
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
                  }
            }
            validationSchema={couponSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);

              if (update) {
                updatecoupon(values);
                // handleUpdate(values);
              } else {
                addcoupon(values);
                // handleProuctsSubmit(values);
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
