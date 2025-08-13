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
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Checkbox from "@mui/material/Checkbox";

function Products() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const email = formJson.email;
    console.log(email);
    handleClose();
  };

  const categary = [
    {
      value: "fruit",
      label: "fruit",
    },
    {
      value: "veritable",
      label: "veritable",
    },
    {
      value: "dey fruit",
      label: "dey fruit",
    },
  ];

  const subcategary = [
    {
      value: "fruit",
      label: "fruit",
    },
    {
      value: "veritable",
      label: "veritable",
    },
    {
      value: "dey fruit",
      label: "dey fruit",
    },
  ];

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
              <TextField
                id="categary"
                margin="dense"
                name="categary"
                select
                label="Select Categary"
                helperText=""
                variant="standard"
                fullWidth
              >
                {categary.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="subcategary"
                name="subcategary"
                margin="dense"
                select
                label="Select SubCategary"
                helperText=""
                variant="standard"
                fullWidth
              >
                {subcategary.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Name:-"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                id="description"
                label="Description"
                fullWidth
                margin="dense"
                multiline
                rows={4}
                variant="standard"
              />
              <TextField
                margin="dense"
                id="price"
                name="price"
                label="Price:-"
                type="number"
                fullWidth
                variant="standard"
              />
              <FormControl
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
                  name="row-radio-buttons-group"
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
                <Button
                  component="label"
                  margin="dense"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                  />
                </Button>
              </FormControl>

              <FormGroup>
                <FormLabel id="type_label">Discount</FormLabel>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Yes"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel id="type_label">Available</FormLabel>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Available or Not Available"
                />
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
