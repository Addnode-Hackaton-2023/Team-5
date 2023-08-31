import { Grid, Typography, Box, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import StyledDiv from "../../../components/styled-divs";
import { ApexOptions } from "apexcharts";
import axios from "axios";
import { useEffect, useState } from "react";

interface ChartSectionProps {}

interface DeliveryChartData {
  city: string;
  day: Date;
  mealCount: number;
}

const ChartSection: React.FC<ChartSectionProps> = () => {
  const theme = useTheme();

  const [deliveryChartData, setDeliveryChartData] =
    useState<DeliveryChartData[]>();
  const [loading, setLoading] = useState<Boolean>(true);

  const fetchChartData = () => {
    axios
      .get("http://localhost:8080/<Name og endpoint>")
      .then((response) => {
        setDeliveryChartData(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  // Transformed data for chart
  const transformedSeries = deliveryChartData?.reduce(
    (acc, data) => {
      const existing = acc.find((item) => item.name === data.city);
      if (existing) {
        existing.data.push(data.mealCount);
      } else {
        acc.push({ name: data.city, data: [data.mealCount] });
      }
      return acc;
    },
    [] as { name: string; data: number[] }[]
  );

  // Days for categories (Assuming sorted)
  const categories =
    deliveryChartData?.map((data) => new Date(data.day).toLocaleDateString()) ||
    [];

  // Final Chart Data
  const chartData: ApexOptions = {
    chart: { type: "area" },
    stroke: { curve: "smooth" },
    xaxis: { categories },
    series: transformedSeries,
  };
  return (
    <StyledDiv variant="white">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6} sx={{ m: "auto" }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color={theme.palette.primary.main}
            gutterBottom
          >
            Sparade måltider
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            massa lectus, imperdiet eu mi et, porta tempor magna. Aliquam
            efficitur, arcu ac pellentesque euismod, arcu lacus porta augue
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ width: "100%", mx: "auto" }}>
            {loading ? (
              <Typography variant="h6" align="center">
                Loading...
              </Typography>
            ) : (
              <ReactApexChart
                options={chartData}
                series={chartData.series || []}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default ChartSection;
