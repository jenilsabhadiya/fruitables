import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { tokens } from "../../theme";

function DataGridBG({ rows, columns }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          border: 0,
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.primary[900], // Footer background
          },
        }}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        showToolbar
        getRowId={(row) => row._id}
      />
    </Box>
  );
}

export default DataGridBG;
