import { Grid, Typography, Box, useTheme } from "@mui/material";
import StyledDiv from "../components/styled-divs";
import orderDeliveryTruck from "../imgs/undraw_delivery_truck_vt6p.svg";
import StyledCard from "../components/styled-card";
import { Status } from "../interfaces/RouteInstance";
import WebMap from "../components/map/WebMap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

interface EtaData {
  eta: number;
  status: Status;
}

const markerData = {
  longitude: 18.07,
  latitude: 59.33,
};
const EtaPage: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams();

  const [etaData, setEtaData] = useState<EtaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch your data here
    axios
      .get(`http://localhost:8080/api/eta/${id}`)
      .then((response) => {
        setEtaData(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]); // Dependency array to fetch data when `id` changes

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {etaData?.status === Status.STARTED && (
        <StyledDiv variant="secondary">
          <Grid
            container
            spacing={3}
            sx={{ width: { xs: "80%", lg: "50%" }, mx: "auto" }}
          >
            <Grid item xs={12}>
              {loading ? (
                "Loading..."
              ) : (
                <StyledCard
                  title="Eta"
                  content={etaData?.eta.toString() || "N/A"}
                  backgroundColor="white"
                  textColor="primary"
                />
              )}
            </Grid>
          </Grid>
        </StyledDiv>
      )}

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
              Leveransen er{" "}
              {etaData?.status === Status.STARTED ? " på vei" : "avsluttet."}
            </Typography>
          </Grid>
        </Grid>
      </StyledDiv>

      {etaData?.status === Status.STARTED && (
        <StyledDiv variant="secondary">
          <Box sx={{ width: "100%", mx: "auto" }}>
            <WebMap markerData={markerData} />
          </Box>
        </StyledDiv>
      )}
    </Box>
  );
};

export default EtaPage;
