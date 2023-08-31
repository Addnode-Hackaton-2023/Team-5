import Box from "@mui/material/Box";
import StyledDiv from "../components/styled-divs";
import Grid from "@mui/material/Grid";
import { ApexOptions } from "apexcharts";
import { Container, Typography, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import MapSection from "../views/PublicPage/MapSection";
import QuoteSection from "../views/PublicPage/QuoteSection";
import HeaderSection from "../views/PublicPage/HeaderSection";
import ChartSection from "../views/PublicPage/DeliveryChartSection";

const PublicPage: React.FC = () => {
  return (
    <>
      <HeaderSection />

      <ChartSection />

      <QuoteSection />

      <MapSection />
    </>
  );
};

export default PublicPage;
