import React from "react";
// import { useMsal } from "@azure/msal-react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.clear();

    navigate("/");
    window.location.reload();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Logout">
        {isDesktop ? (
          <IconButton
            color="error"
            size="medium"
            aria-label="logout"
            onClick={handleClickOpen}
          >
            <LogoutIcon fontSize="medium" />
          </IconButton>
        ) : (
          <IconButton
            color="error"
            size="large"
            aria-label="logout"
            onClick={handleClickOpen}
          >
            <LogoutIcon fontSize="large" />
          </IconButton>
        )}
      </Tooltip>
      <Dialog
        sx={{ border: "3px solid #F44336 " }}
        open={open}
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "fontWeightBold",
              color: "text.primary"
            }}
          >
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            {" "}
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              handleLogout();
            }}
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
