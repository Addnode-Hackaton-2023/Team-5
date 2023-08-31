import { Box, Grid, Container, Typography, useTheme } from "@mui/material";
import StyledCard from "../../../components/styled-card";
import StyledDiv from "../../../components/styled-divs";
import axios from "axios";
import { useState, useEffect } from "react";

interface HeaderSectionProps {}

interface TotalSavedData {
  meals: string;
  co2: string;
  money: string;
}

const HeaderSection: React.FC<HeaderSectionProps> = () => {
  const theme = useTheme();

  const [cardData, setCardData] = useState<TotalSavedData>();
  const [animatedMeals, setAnimatedMeals] = useState(0);
  const [animatedCO2, setAnimatedCO2] = useState(0);
  const [animatedMoney, setAnimatedMoney] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/totaldelivered")
      .then((response) => {
        setCardData(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (cardData) {
      const intervalMeals = setInterval(() => {
        setAnimatedMeals((prev) =>
          Math.min(prev + 20, parseInt(cardData.meals))
        );
      }, 10);
      const intervalCO2 = setInterval(() => {
        setAnimatedCO2((prev) => Math.min(prev + 13, parseInt(cardData.co2)));
      }, 10);
      const intervalMoney = setInterval(() => {
        setAnimatedMoney((prev) =>
          Math.min(prev + 980, parseInt(cardData.money))
        );
      }, 10);

      return () => {
        clearInterval(intervalMeals);
        clearInterval(intervalCO2);
        clearInterval(intervalMoney);
      };
    }
  }, [cardData]);

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
                  Om en fjärdedel av den mat som för närvarande går förlorad
                  eller till spillo kan sparas, skulle det räcka för att mata
                  870 miljoner människor.
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
                      content={loading ? "N/A" : animatedMeals.toString()}
                      backgroundColor="white"
                      textColor={theme.palette.primary.main}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <StyledCard
                      title={"CO2 spart"}
                      content={loading ? "N/A" : animatedCO2.toString()}
                      backgroundColor="white"
                      textColor={theme.palette.primary.main}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <StyledCard
                      title={"Penger spart"}
                      content={loading ? "N/A" : animatedMoney.toString()}
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
