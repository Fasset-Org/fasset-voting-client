import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import React from "react";
// import { Outlet } from "react-router-dom";
import logo from "../../images/horizontal-logo.png";
import { SignOutButton } from "../SignOutButton";
import { useIsAuthenticated } from "@azure/msal-react";
import { useTheme } from "@mui/material/styles";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navigation = ({ currentTheme, setThemeMode, children }) => {
  const isAuth = useIsAuthenticated();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  console.log(currentTheme);

  return (
    <Stack>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          color="transparent"
          sx={{ bgcolor: "#1f2f79" }}
        >
          <Toolbar>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Stack justifyContent="center">
                <img src={logo} alt="Logo" width={220} height={64} />
              </Stack>
              <Stack
                justifyContent="center"
                direction="row"
                alignItems="center"
                spacing={2}
              >
                <Tooltip title="Set Theme">
                  {isDesktop ? (
                    <>
                      {currentTheme ? (
                        <IconButton
                          onClick={() => setThemeMode(!currentTheme)}
                          size="medium"
                          sx={{ color: "#FFFFFF" }}
                        >
                          <DarkModeIcon
                            fontSize="medium"
                            sx={{ color: "#FFFFFF" }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => setThemeMode(!currentTheme)}
                          size="medium"
                          sx={{ color: "#FFFFFF" }}
                        >
                          <LightModeIcon
                            fontSize="medium"
                            sx={{ color: "#FFFFFF" }}
                          />
                        </IconButton>
                      )}
                    </>
                  ) : (
                    <>
                      {currentTheme ? (
                        <IconButton
                          onClick={() => setThemeMode(!currentTheme)}
                          size="large"
                          sx={{ color: "#FFFFFF" }}
                        >
                          <DarkModeIcon fontSize="large" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => setThemeMode(!currentTheme)}
                          size="large"
                          sx={{ color: "#FFFFFF" }}
                        >
                          <LightModeIcon
                            fontSize="large"
                            sx={{ color: "#FFFFFF" }}
                          />
                        </IconButton>
                      )}
                    </>
                  )}
                </Tooltip>
                {isAuth && <SignOutButton />}
              </Stack>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack mt={8}>{children}</Stack>
    </Stack>
  );
};

export default Navigation;
