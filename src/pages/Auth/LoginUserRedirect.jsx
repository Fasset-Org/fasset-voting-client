// App.js
import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth.Config";
import { Button, Stack, Typography } from "@mui/material";
import logo from "../../images/blueLogo-transparentBg.png";
import { Navigate } from "react-router-dom";

const LoginUserRedirect = () => {
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      instance
        .handleRedirectPromise()
        .then((response) => {
          // console.log("Redirect response:", response);
          if (response) {
            localStorage.setItem("accessToken", response.accessToken);
            // console.log("Redirect response:", response);
            // localStorage.setItem("accessToken", response.accessToken);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [accounts.length, instance]);

  const handleLogin = () => {
    instance
      .loginRedirect(loginRequest)
      .then((resp) => {})
      .catch((e) => {
        console.error(e);
      });
  };

  if (accounts.length > 0) {
    return <Navigate to={"/vote"} />;
  } else {
    return (
      <Stack
        spacing={2}
        padding={2}
        height="85vh"
        justifyContent="center"
        alignItems="center"
        // sx={{ border: 5, borderColor: "primary.main" }}
      >
        {/* <Stack
          alignItems="center"
          justifyContent="center"
          border={1}
          width={"80%"}
        > */}
        <Stack justifyItems="center" alignItems="center">
          <img src={logo} alt="Logo Img" height={250} width={250} />
        </Stack>
        <Typography fontSize={20} fontWeight="bolder">
          Welcome
        </Typography>
        <Typography fontWeight="bolder" sx={{ color: "primary.main" }}>
          Login to FASSET voting system to cast your vote
        </Typography>
        <Button
          variant="contained"
          sx={{ width: { md: "50%", xs: "100%" } }}
          onClick={handleLogin}
        >
          Login
        </Button>
        {/* </Stack> */}
      </Stack>
    );
  }
};

export default LoginUserRedirect;
