import { Box, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import React from "react";

function BarChartData({
  Fruits,
  Vegitables,
  DayFruits,
  OrganicItems,
  xLabels,
}) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
            color={(theme) => (theme.palette.mode === "dark" ? "#fff" : "#000")}
          >
            Sells of diffrent Category
          </Typography>
          <Typography variant="body2" color="text.secondary">
            (+43%) than last year
          </Typography>
        </Box>
      </Box>

      <BarChart
        height={300}
        series={[
          { data: Fruits, label: "Fruits", id: "fId", stack: "total" },
          { data: Vegitables, label: "Vegitables", id: "vId", stack: "total" },
          { data: DayFruits, label: "Day Fruits", id: "dfId", stack: "total" },
          {
            data: OrganicItems,
            label: "Organic Items",
            id: "oiId",
            stack: "total",
          },
        ]}
        xAxis={[{ data: xLabels }]}
        yAxis={[{ width: 50 }]}
      />
    </Paper>
  );
}

export default BarChartData;
