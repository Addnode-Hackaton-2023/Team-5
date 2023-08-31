import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
  title: string;
  content: any;
  icon?: any;
  backgroundColor?: string;
  textColor?: string;
}

const StyledCard: FC<Props> = ({ title, content, icon, backgroundColor, textColor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        bgcolor: backgroundColor,
        borderRadius: 5,
        border: "1px solid #ccc",
      }}
    >
      {icon && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            color: "primary.main",
            width: 64,
            height: 64,
            borderRadius: "10%",
            mb: 2,
          }}
        >
          {icon}
        </Box>
      )}

      <Typography
        variant="h5"
        component="h2"
        color={textColor ? textColor : "text.primary"}
      >
        {content}
      </Typography>

      <Typography variant="body1" color="text.secondary">
        {title}
      </Typography>
    </Box>
  );
};

export default StyledCard;
