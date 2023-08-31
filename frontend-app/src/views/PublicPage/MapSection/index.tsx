import { Grid, Typography, Box, useTheme } from "@mui/material";
import WebMap from "../../../components/map/WebMap";
import StyledDiv from "../../../components/styled-divs";

interface MapSectionProps {}
const markersDataList = [
  // Stockholm
  {
    longitude: 18.0686,
    latitude: 59.3293,
  },
  // Gothenburg
  {
    longitude: 11.9746,
    latitude: 57.7089,
  },
  // Malmö
  {
    longitude: 13.0038,
    latitude: 55.604,
  },

  // Lund
  {
    longitude: 13.191,
    latitude: 55.7047,
  },
];
const MapSection: React.FC<MapSectionProps> = () => {
  const theme = useTheme();

  return (
    <StyledDiv variant="white">
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6} sx={{ m: "auto" }}>
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color={theme.palette.primary.main}
            gutterBottom
          >
            Her finnes vi
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Vi finnes i Stockholm, Gøteborg, Malmø og Lund.
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box sx={{ width: "100%", mx: "auto" }}>
            <WebMap markersDataList={markersDataList} />
          </Box>
        </Grid>
      </Grid>
    </StyledDiv>
  );
};

export default MapSection;
