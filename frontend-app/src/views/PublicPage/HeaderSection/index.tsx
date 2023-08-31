import { Box, Grid, Container, Typography, useTheme } from "@mui/material";
import StyledCard from "../../../components/styled-card";
import StyledDiv from "../../../components/styled-divs";
import axios from "axios";
import { useState, useEffect } from "react";

interface HeaderSectionProps {}

interface TotalSavedData {
  mealCount: string;
  savedCO2: string;
  savedMoney: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = () => {
  const theme = useTheme();

  const [cardData, setCardData] = useState<TotalSavedData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/cards")
      .then((response) => {
        setCardData(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <StyledDiv variant="secondary">
      <Box>
        <Grid container>
          <Grid item xs={12} sx={{ m: "center" }}>
            <Box
              sx={{
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color={theme.palette.primary.main}
                  gutterBottom
                >
                  Allwin
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum massa lectus, imperdiet eu mi et, porta tempor
                  magna. Aliquam efficitur, arcu ac pellentesque euismod, arcu
                  lacus porta augue
                </Typography>
              </Container>
            </Box>
          </Grid>
          <Grid item xs={8} sx={{ mx: "auto" }}>
            <Grid
              container
              spacing={3}
              display={"flex"}
              justifyContent={"center"}
            >
              {loading ? (
                <Typography variant="h6" align="center">
                  Loading...
                </Typography>
              ) : (
                <>
                  <Grid item xs={12} lg={3}>
                    <StyledCard
                      title={"Antall måltider"}
                      content={cardData?.mealCount || "N/A"}
                      backgroundColor="white"
                      textColor={theme.palette.primary.main}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <StyledCard
                      title={"CO2 spart"}
                      content={cardData?.savedCO2 || "N/A"}
                      backgroundColor="white"
                      textColor={theme.palette.primary.main}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <StyledCard
                      title={"Penger spart"}
                      content={cardData?.savedMoney || "N/A"}
                      backgroundColor="white"
                      textColor={theme.palette.primary.main}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </StyledDiv>
  );
};

export default HeaderSection;
