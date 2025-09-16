import { Box, Paper, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";

function LineChartData({ data }) {
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
            {data.label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.text}
          </Typography>
        </Box>
      </Box>
      <LineChart
        height={300}
        series={[
          { data: data.Fruits, label: "Fruits" },
          { data: data.Vegitables, label: "Vegitables" },
          { data: data.DayFruits, label: "DayFruits" },
          { data: data.OrganicItems, label: "OrganicItems" },
        ]}
        xAxis={[{ scaleType: "point", data: data.xLabels }]}
        yAxis={[{ width: 50 }]}
        margin={data.margin}
      />

      {/* <LineChart
        height={300}
        series={[
          ...["Fruits", "Vegitables", "DayFruits", "OrganicItems"].map(
            (v) => ({
              data: data[v],
              label: v,
            })
          ),
        ]}
        xAxis={[{ scaleType: "point", data: data.xLabels }]}
        yAxis={[{ width: 50 }]}
        margin={data.margin}
      /> */}
    </Paper>
  );
}

export default LineChartData;
