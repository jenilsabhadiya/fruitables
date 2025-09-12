import React from "react";
import { Grid, Paper, Typography, Box, useTheme } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { tokens } from "../../theme";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showHighlight, setShowHighlight] = React.useState(true);
  const [showTooltip, setShowTooltip] = React.useState(true);

  const handleHighlightChange = (event) => {
    setShowHighlight(event.target.checked);
  };

  const handleTooltipChange = (event) => {
    setShowTooltip(event.target.checked);
  };

  const stats = [
    {
      title: "Total active users",
      value: "18,765",
      change: "+2.6%",
      status: true,
      color: colors.primary[500],
      data: [1, 4, 2, 5, 7, 2, 4, 6],
      dataColor: colors.primary[500],
    },
    {
      title: "Total installed",
      value: "4,876",
      change: "+0.2%",
      status: true,
      color: colors.primary[800],
      data: [8, 5, 2, 5, 9, 2, 8, 1],
      dataColor: colors.primary[900],
    },
    {
      title: "Total downloads",
      value: "678",
      change: "-0.1%",
      status: false,
      color: colors.primary[100],
      data: [1, 4, 2, 5, 7, 2, 4, 6],
      dataColor: colors.primary[100],
    },
    {
      title: "Custom stat",
      value: "1,234",
      change: "+1.0%",
      status: true,
      color: colors.primary[300],
      data: [8, 5, 2, 5, 9, 2, 8, 1],
      dataColor: colors.primary[400],
    },
  ];

  const StatCard = ({
    title,
    value,
    change,
    status,
    color,
    data,
    dataColor,
  }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="subtitle2" color="text.primary">
        {title}
      </Typography>

      <Grid container spacing={2}>
        <Grid
          size={8}
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "self-end",
          }}
        >
          <Typography color="text.primary" variant="h4" fontWeight={700}>
            {value}
          </Typography>
        </Grid>
        <Grid size={4}>
          <SparkLineChart
            plotType="bar"
            data={data}
            height={50}
            width={70}
            showHighlight={showHighlight}
            showTooltip={showTooltip}
            color={dataColor}
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>

      <Box display="flex" alignItems="center" color={color}>
        {status ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : (
          <ArrowDownwardIcon fontSize="small" />
        )}
        <Typography variant="p" sx={{ ml: 0.5 }}>
          {change} last 7 days
        </Typography>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        {stats.map((v, i) => (
          <Grid size={{ xs: 12, md: 6, lg: 3 }} key={i}>
            <StatCard {...v} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Dashboard;
