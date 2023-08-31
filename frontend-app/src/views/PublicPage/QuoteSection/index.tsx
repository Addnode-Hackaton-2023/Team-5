import { Box, Typography } from "@mui/material";
import StyledDiv from "../../../components/styled-divs";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

interface QuoteSectionProps {}
const QuoteSection: React.FC<QuoteSectionProps> = () => {
  return (
    <StyledDiv variant="secondary">
      <Box sx={{ display: "flex", mx: "auto", width: 500 }}>
        <FormatQuoteIcon
          color="primary"
          sx={{ fontSize: "5rem", ml: "auto" }}
        />
        <Typography
          variant="h5"
          align="left"
          color="text.secondary"
          paragraph
          sx={{ my: "auto" }}
        >
          Vi levererade nyss 58 kg till Mariakyrkan. Tack alla som bidragit!
        </Typography>
      </Box>
    </StyledDiv>
  );
};

export default QuoteSection;
