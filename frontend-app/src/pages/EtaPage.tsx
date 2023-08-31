import { Grid, Typography, Box, useTheme } from "@mui/material";
import StyledDiv from "../components/styled-divs";
import orderDeliveryTruck from "../imgs/undraw_delivery_truck_vt6p.svg";
import orderDelivered from "../imgs/undraw_order_delivered_re_v4ab.svg";
import orderNotFound from "../imgs/undraw_page_not_found_re_e9o6(1).svg";

import StyledCard from "../components/styled-card";
import { Status } from "../interfaces/RouteInstance";
import WebMap from "../components/map/WebMap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import format from "date-fns/format";
import { sv } from "date-fns/locale";

interface EtaData {
  eta: Date;
  status: Status;
  longitude: number;
  latitude: number;
}

const EtaPage: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams();

  const [etaData, setEtaData] = useState<EtaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/eta/get/${id}`)
      .then((response) => {
        setEtaData(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {!loading && !etaData ? (
        <StyledDiv variant="white">
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <img src={orderNotFound} alt="" style={{ width: "20rem" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h3"
                align="center"
                color={theme.palette.primary.main}
                gutterBottom
              >
                Not found
              </Typography>
            </Grid>
          </Grid>
        </StyledDiv>
      ) : loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          {etaData?.status === Status.ACTIVE && (
            <StyledDiv variant="secondary">
              <Grid
                container
                spacing={3}
                sx={{ width: { xs: "80%", lg: "50%" }, mx: "auto" }}
              >
                <Grid item xs={12}>
                  <StyledCard
                    title="Eta"
                    content={
                      etaData
                        ? format(new Date(etaData?.eta), "PPpp", {
                            locale: sv,
                          })
                        : "N/A"
                    }
                    backgroundColor="white"
                    textColor="primary"
                  />
                </Grid>
              </Grid>
            </StyledDiv>
          )}

          <StyledDiv variant="white">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {etaData?.status === Status.ACTIVE ? (
                  <img
                    src={orderDeliveryTruck}
                    alt=""
                    style={{ width: "20rem" }}
                  />
                ) : (
                  <img src={orderDelivered} alt="" style={{ width: "20rem" }} />
                )}
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
                  {etaData?.status === Status.ACTIVE ? " på vei" : "avsluttet."}
                </Typography>
              </Grid>
            </Grid>
          </StyledDiv>

          {etaData?.status === Status.ACTIVE && (
            <StyledDiv variant="secondary">
              <Box sx={{ width: "100%", mx: "auto" }}>
                {!(etaData?.latitude && etaData?.longitude) ? (
                  <Typography
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    paragraph
                  >
                    Kart vil vises snart
                  </Typography>
                ) : (
                  <WebMap
                    markerData={{
                      latitude: etaData.latitude,
                      longitude: etaData.longitude,
                    }}
                  />
                )}
              </Box>
            </StyledDiv>
          )}
        </>
      )}
    </Box>
  );
};

export default EtaPage;
