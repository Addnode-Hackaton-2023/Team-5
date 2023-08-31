import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { Link, Outlet } from "react-router-dom";
import Copyright from "../components/footer";
import StyledDiv from "../components/styled-divs";

const Layout: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: 120 }}>
        <Container maxWidth="xl" sx={{ my: "auto" }}>
          <Toolbar disableGutters>
            <Box
              sx={{ display: { xs: "none", md: "flex" } }}
              component={Link}
              to={"/"}
            >
              <img
                style={{
                  marginRight: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                alt="Allwin Logo"
                src="https://static.wixstatic.com/media/49e5b6_32c39682e4804e24bce18237839c4d1c~mv2.png/v1/fill/w_63,h_63,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Allwin_Logo_Round_03.png"
              />
            </Box>

            <Box
              sx={{ display: { xs: "flex", md: "none" } }}
              component={Link}
              to={"/"}
            >
              <img
                style={{
                  marginRight: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                alt="Allwin Logo"
                src="https://static.wixstatic.com/media/49e5b6_32c39682e4804e24bce18237839c4d1c~mv2.png/v1/fill/w_63,h_63,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Allwin_Logo_Round_03.png"
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main">
        <Outlet />
      </Box>
      <StyledDiv variant="white">
        <>
          <Typography variant="h6" align="center" gutterBottom>
            ALLWIN AB
          </Typography>

          <Copyright />
        </>
      </StyledDiv>
    </Box>
  );
};

export default Layout;
