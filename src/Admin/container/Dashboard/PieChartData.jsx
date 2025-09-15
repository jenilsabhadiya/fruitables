import { Box, Divider, Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import React from "react";

function PieChartData({ data, settings, label, text }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600 }}
        color={(theme) => (theme.palette.mode === "dark" ? "#fff" : "#000")}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{ paddingTop: 1, paddingBottom: 4 }}
        color="text.secondary"
      >
        {text}
      </Typography>
      <PieChart
        sx={{ py: 2.3 }}
        series={[
          {
            innerRadius: 50,
            outerRadius: 100,
            data: data.map((v) => ({ ...v, color: v.color })),
            arcLabel: "value",
          },
        ]}
        {...settings}
      />
      <Typography sx={{ py: 2 }}>
        <Divider sx={{ borderStyle: "dashed" }} />
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        {data.map((v, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: v.color,
                mr: 1,
              }}
            />
            <Typography variant="body2">{v.label}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}

export default PieChartData;
