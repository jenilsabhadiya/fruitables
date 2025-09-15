import { Box, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";

function LineChartData({
  Fruits,
  Vegitables,
  DayFruits,
  OrganicItems,
  xLabels,
  margin,
  label,
  text
}) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
            // color={colors.primary[500]}
            color={(theme) => (theme.palette.mode === "dark" ? "#fff" : "#000")}
          >
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </Box>
      </Box>
      <LineChart
        height={300}
        series={[
          { data: Fruits, label: "Fruits" },
          { data: Vegitables, label: "Vegitables" },
          { data: DayFruits, label: "DayFruits" },
          { data: OrganicItems, label: "OrganicItems" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{ width: 50 }]}
        margin={margin}
      />
    </Paper>
  );
}

export default LineChartData;
