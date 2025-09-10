import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { tokens } from "../../theme";

function DataGridBG({ rows, columns, ...otherProps }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[800], // Header background
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.primary[900], // Footer background
          },
        }}
        {...otherProps}
      />
    </Box>
  );
}

export default DataGridBG;
