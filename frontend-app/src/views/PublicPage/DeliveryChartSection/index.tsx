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

  const theme = useTheme();

  const chartData: ApexOptions = {
    chart: {
      type: "area",
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [2016, 2017, 2018, 2019.202, 2021, 2022, 2023],
    },
    legend: {
      width: 600,
      horizontalAlign: "left",
      itemMargin: {
        vertical: 5,
        horizontal: 5,
      },
    },
    series: [
      {
        name: "Stockholm",
        data: [10, 20, 30, 33, 44, 66, 100],
      },
      {
        name: "Gøteborg",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Lund",
        data: [0, 34, 52, 41, 11, 32, 45],
      },
    ],
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
            <ReactApexChart options={chartData} series={chartData.series} />
          </Box>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default ChartSection;
