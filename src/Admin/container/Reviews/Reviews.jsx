import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Switch,
} from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
function Reviews() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const columns = [
    { field: "name", headerName: "Name:-", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "review", headerName: "Review", width: 250 },
    { field: "half_rating", headerName: "Rating", width: 100 },
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
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handlePreviewClick(params.row)}
        >
          <PreviewIcon />
        </Button>
      ),
    },
  ];

  const handlePreviewClick = (row) => {
    setSelectedReview(row);
    setOpen(true);
  };

  const getAllData = async () => {
    try {
      const response = await fetch("http://localhost:3000/reviews");
      const result = await response.json();
      //   console.log(result);
      setRows(result);
    } catch (error) {
      console.log(error);
    }
  };

  const paginationModel = { page: 0, pageSize: 5 };

  const handleStatus = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/reviews/" + data.id, {
        method: "PUT",
        body: JSON.stringify({ ...data, status: !data.status }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      console.log(result);
      getAllData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Review Data</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review Details</DialogTitle>
        <DialogContent>
          {selectedReview && (
            <DialogContentText>
              <strong>Name:</strong> {selectedReview.name} <br />
              <strong>Email:</strong> {selectedReview.email} <br />
              <strong>Rating:</strong> {selectedReview.half_rating} <br />
              <strong>Review:</strong> {selectedReview.review}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Reviews;
