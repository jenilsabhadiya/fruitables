import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  useTheme,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  TableHead,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { tokens } from "../../theme";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import { DataGrid } from "@mui/x-data-grid";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

const ProductCard = ({ data }) => (
  <Card sx={{ borderRadius: 3, py: 2 }}>
    <CardContent>
      <Typography
        variant="h6"
        mb={2}
        color="text.primary"
        sx={{ px: 4, fontSize: "1.125rem", fontWeight: "600" }}
      >
        Best Products
      </Typography>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F4F6F8",
            }}
          >
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#637381",
              }}
            >
              Products Img
            </TableCell>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#637381",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#637381",
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#637381",
              }}
            >
              Total Orders
            </TableCell>
            <TableCell
              sx={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#637381",
              }}
            >
              Rank
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((v) => (
            <TableRow key={v._id}>
              <TableCell>
                <img
                  src={v.products_img}
                  alt="product"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                  }}
                />
              </TableCell>
              <TableCell>{v.name}</TableCell>
              <TableCell>{v.price}</TableCell>
              <TableCell>{v.total_orders}</TableCell>
              <TableCell>
                <Chip label={v.rank} color={v.rankColor} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

const Latestproducts = ({ data }) => (
  <Card sx={{ borderRadius: 3, py: 2 }}>
    <CardContent>
      <Typography variant="h6" mb={2}>
        Latest Products
      </Typography>
      <Stack spacing={4}>
        {data.map((v) => (
          <Stack key={v._id} direction="row" spacing={2} alignItems="center">
            <img
              src={v.products_img}
              alt="product"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: 14,
              }}
            />
            <Box flex={1}>
              <Typography variant="body1">{v.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {v.oldPrice && (
                  <span
                    style={{ textDecoration: "line-through", marginRight: 8 }}
                  >
                    {v.oldPrice}
                  </span>
                )}
                <strong>{v.discountPrice || v.price}</strong>
              </Typography>
            </Box>
            <Box sx={{ position: "relative", width: 40, height: 16 }}>
              {v.colors.slice(0, 3).map((color, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 12,
                    height: 12,
                    bgcolor: color,
                    borderRadius: "50%",
                    position: "absolute",
                    left: `${i * 10}px`,
                    zIndex: 3 - i,
                  }}
                />
              ))}
              {v.colors.length > 3 && (
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    left: `${3 * 11}px`,
                    top: -3,
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    zIndex: 0,
                  }}
                >
                  +{v.colors.length - 3}
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
    </CardContent>
  </Card>
);

const PieChartData = ({ data, settings }) => (
  <Paper sx={{ p: 3, borderRadius: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 600 }}>
      Current download
    </Typography>
    <Typography
      variant="body2"
      sx={{ paddingTop: 1, paddingBottom: 4 }}
      color="text.secondary"
    >
      Downloaded by operating system
    </Typography>
    <PieChart
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
    <Typography sx={{ paddingTop: 2 }}>
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

const BarChartData = ({ pData, uData, xLabels }) => (
  <Paper sx={{ p: 3, borderRadius: 3 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Area installed
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (+43%) than last year
        </Typography>
      </Box>
    </Box>

    <BarChart
      height={300}
      series={[
        { data: pData, label: "pv", id: "pvId", stack: "total" },
        { data: uData, label: "uv", id: "uvId", stack: "total" },
      ]}
      xAxis={[{ data: xLabels }]}
      yAxis={[{ width: 50 }]}
    />
  </Paper>
);

const LineChartData = ({ margin, pDataLine, uDataLine, xLabelsLine }) => (
  <Paper sx={{ p: 3, borderRadius: 3 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Yearly sales
        </Typography>
        <Typography variant="body2" color="text.secondary">
          (+43%) than last year
        </Typography>
      </Box>
    </Box>
    <LineChart
      height={300}
      series={[
        { data: pDataLine, label: "pv" },
        { data: uDataLine, label: "uv" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabelsLine }]}
      yAxis={[{ width: 50 }]}
      margin={margin}
    />
  </Paper>
);

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
      dataColor: colors.primary[300],
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

  const product = [
    {
      _id: 3,
      products_img: "../../../../public/assets/img/best-product-1.jpg",
      name: "ABCD",
      price: "$150",
      total_orders: "280",
      rank: "Top1",
      rankColor: "success",
    },
    {
      _id: 4,
      products_img: "../../../../public/assets/img/best-product-2.jpg",
      name: "abcd",
      price: "$350",
      total_orders: "50",
      rank: "Top2",
      rankColor: "success",
    },
    {
      _id: 5,
      products_img: "../../../../public/assets/img/best-product-3.jpg",
      name: "xyz",
      price: "$150",
      total_orders: "200",
      rank: "Top3",
      rankColor: "success",
    },
    {
      _id: 6,
      products_img: "../../../../public/assets/img/best-product-4.jpg",
      name: "pqr",
      price: "$50",
      total_orders: "300",
      rank: "Top4",
      rankColor: "success",
    },
    {
      _id: 7,
      products_img: "../../../../public/assets/img/best-product-5.jpg",
      name: "ABCD",
      price: "$30",
      total_orders: "250",
      rank: "Top5",
      rankColor: "success",
    },
  ];

  const latestproducts = [
    {
      _id: 1,
      products_img: "../../../../public/assets/img/best-product-1.jpg",
      name: "product name ",
      price: "$50",
      variant: 3,
      colors: ["#00C49F", "#FFBB28", "#FF8042", "#FFBB28"],
    },
    {
      _id: 2,
      products_img: "../../../../public/assets/img/best-product-2.jpg",
      name: "product name ",
      price: "$50",
      variant: 3,
      colors: ["#8B4513", "#D2B48C"],
    },
    {
      _id: 3,
      products_img: "../../../../public/assets/img/best-product-3.jpg",
      name: "product name ",
      price: "$97.14",
      variant: 3,
      oldPrice: "$97.14",
      discountPrice: "$85.21",
      colors: ["#00C49F", "#00BFFF", "#DC143C", "#FFBB28", "#DC143C"],
    },
    {
      _id: 4,
      products_img: "../../../../public/assets/img/best-product-4.jpg",
      name: "product name ",
      price: "$97",
      variant: 3,
      oldPrice: "$97",
      discountPrice: "$68.71",
      colors: ["#800080", "#4B0082"],
    },
    {
      _id: 5,
      products_img: "../../../../public/assets/img/best-product-5.jpg",
      name: "product name ",
      price: "$50",
      variant: 3,
      colors: ["#00008B"],
    },
  ];

  const data = [
    { label: "Group A", value: 400, color: colors.primary[300] },
    { label: "Group B", value: 300, color: colors.primary[500] },
    { label: "Group C", value: 300, color: colors.secondary[300] },
    { label: "Group D", value: 200, color: colors.secondary[300] },
  ];

  const settings = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    hideLegend: true,
  };

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  const margin = { right: 24 };
  const uDataLine = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pDataLine = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabelsLine = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

  return (
    <Box sx={{ p: 2, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        {stats.map((v, i) => (
          <Grid size={{ xs: 12, md: 6, lg: 3 }} key={i}>
            <StatCard {...v} />
          </Grid>
        ))}
        <Grid size={8}>
          <ProductCard data={product} />
        </Grid>
        <Grid size={4}>
          <Latestproducts data={latestproducts} />
        </Grid>
        <Grid size={4}>
          <PieChartData data={data} settings={settings} />
        </Grid>
        <Grid size={8}>
          <BarChartData uData={uData} pData={pData} xLabels={xLabels} />
        </Grid>
        <Grid size={12}>
          <LineChartData
            uDataLine={uDataLine}
            pDataLine={pDataLine}
            xLabelsLine={xLabelsLine}
            margin={margin}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
