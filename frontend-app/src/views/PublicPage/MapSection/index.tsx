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
  // Uppsala
  {
    longitude: 17.6389,
    latitude: 59.8586,
  },
  // Västerås
  {
    longitude: 16.5448,
    latitude: 59.6099,
  },
  // Örebro
  {
    longitude: 15.2105,
    latitude: 59.2753,
  },
  // Linköping
  {
    longitude: 15.6214,
    latitude: 58.4109,
  },
  // Helsingborg
  {
    longitude: 12.6945,
    latitude: 56.0467,
  },
  // Jönköping
  {
    longitude: 14.1562,
    latitude: 57.7826,
  },
  // Norrköping
  {
    longitude: 16.1826,
    latitude: 58.5942,
  },
  // Lund
  {
    longitude: 13.191,
    latitude: 55.7047,
  },
  // Umeå
  {
    longitude: 20.2597,
    latitude: 63.8258,
  },
  // Gävle
  {
    longitude: 17.1417,
    latitude: 60.6745,
  },
  // Borås
  {
    longitude: 12.9401,
    latitude: 57.721,
  },
  // Eskilstuna
  {
    longitude: 16.5077,
    latitude: 59.3739,
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
