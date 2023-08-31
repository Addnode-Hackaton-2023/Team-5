import { Grid, Typography, Box, useTheme } from "@mui/material";
import StyledDiv from "../components/styled-divs";
import orderDeliveryTruck from "../imgs/undraw_delivery_truck_vt6p.svg";
import StyledCard from "../components/styled-card";
import { Status } from "../interfaces/RouteInstance";
import { WebMap } from "../components/map/WebMap";
const EtaPage: React.FC = () => {
  const theme = useTheme();

  return (
    <>
      <StyledDiv variant="secondary">
        <Grid
          container
          spacing={3}
          sx={{ width: { xs: "80%", lg: "50%" }, mx: "auto" }}
        >
          <Grid item xs={12} lg={6}>
            <StyledCard title="Eta" content={"232"} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <StyledCard title="Status" content={Status.STARTED} />
          </Grid>
        </Grid>
      </StyledDiv>
      <StyledDiv variant="white">
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <img src={orderDeliveryTruck} alt="" style={{ width: "20rem" }} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color={theme.palette.primary.main}
              gutterBottom
            >
              Din ordre er på vei
            </Typography>
          </Grid>
        </Grid>
      </StyledDiv>
      <StyledDiv variant="secondary">
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
              <WebMap />
            </Box>
          </Grid>
        </Grid>
      </StyledDiv>
    </>
  );
};

export default EtaPage;
