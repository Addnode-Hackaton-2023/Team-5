import { Box, Typography } from "@mui/material";
import StyledDiv from "../../../components/styled-divs";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import axios from "axios";
import { useState, useEffect } from "react";
interface QuoteData {
  weight: number;
  location: string;
}

interface QuoteSectionProps {}
const QuoteSection: React.FC<QuoteSectionProps> = () => {
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/quote")
      .then((response) => {
        setQuoteData(response.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <StyledDiv variant="secondary">
      <Box sx={{ display: "flex", mx: "auto", width: 500 }}>
        <FormatQuoteIcon
          color="primary"
          sx={{ fontSize: "5rem", ml: "auto" }}
        />
        {loading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : (
          <Typography
            variant="h5"
            align="left"
            color="text.secondary"
            paragraph
            sx={{ my: "auto" }}
          >
            {`Vi levererade nyss ${quoteData?.weight || "N/A"} kg till ${
              quoteData?.location || "N/A"
            }. Tack alla som bidragit!`}
          </Typography>
        )}
      </Box>
    </StyledDiv>
  );
};

export default QuoteSection;
