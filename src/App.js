import "./App.css";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";

import { graphConfig, loginRequest } from "./auth.Config";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import axios from "axios";

function App() {
  const { accounts, instance } = useMsal();

  const isAuthenticated = useIsAuthenticated();
  const [userData, setUserData] = useState(null);

  console.log(userData);

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create"
      })
      .catch((err) => console.log(err));
  };

  console.log(accounts);
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    instance
      .handleRedirectPromise()
      .then((response) => {
        if (response) {
          console.log("Redirect response:", response);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [instance]);

  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      const request = {
        ...loginRequest,
        account: accounts[0]
      };

      instance
        .acquireTokenSilent(request)
        .then((response) => {
          const accessToken = response.accessToken;
          console.log(accessToken);
          fetchUserData(accessToken);
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenRedirect(request)
              .then((response) => {
                const accessToken = response.accessToken;
                console.log(accessToken);
                fetchUserData(accessToken);
              })
              .catch((err) => console.log(err));
          }
        });
    }
  }, [isAuthenticated, accounts, instance]);

  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get(graphConfig.graphUserEndpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="App">
        <Typography>Signed In</Typography>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Button variant="contained" onClick={handleRedirect}>
          Sign In
        </Button>
      </div>
    );
  }
}

export default App;
