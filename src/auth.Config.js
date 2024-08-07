import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "a6b87076-63f7-4fb8-924f-1f9f079b5fce",
    authority:
      "https://login.microsoftonline.com/3d3f86ca-e332-4da9-b129-8c9c3dea576d",
    redirectUri: "https://voting.fasset.org.za"
    // redirectUri: "http://localhost:3000"
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }

        switch (level) {
          case LogLevel.Error:
            // console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            // console.debug(message);
            return;
          case LogLevel.Warning:
            // console.warn(message);
            return;
          default:
            return;
        }
      }
    }
  }
};

export const loginRequest = {
  scopes: ["User.Read", "User.ReadBasic.All"]
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  graphUserEndpoint:
    "https://graph.microsoft.com/v1.0/me?$select=jobTitle,department"
};
