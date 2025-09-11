import { Grid } from "@mui/material";
import React from "react";

function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <div>h1</div>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <div>h1</div>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <div>h1</div>
      </Grid>
      <Grid size={{ xs: 12, md: 6, lg: 3 }}>
        <div>h1</div>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
