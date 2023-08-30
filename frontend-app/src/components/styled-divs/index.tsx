import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";

interface StyledDivProps {
  variant?: "primary" | "secondary" | "white";
  children: JSX.Element;
}
const StyledDiv: React.FC<StyledDivProps> = ({ variant, children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        width: "100%",
        backgroundColor: `${
          variant === "primary"
            ? theme.palette.primary.main
            : variant === "secondary"
            ? theme.palette.secondary.main
            : "#FFFFFF"
        }`,
      }}
    >
      <Box sx={{ p: 3 }}> {children} </Box>
    </Box>
  );
};

export default StyledDiv;
