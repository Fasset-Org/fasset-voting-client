import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { themeDark, themeLight } from "./theme";
import LoginUserRedirect from "./pages/Auth/LoginUserRedirect";
import Vote from "./pages/Vote/Vote";
import { ReactQueryDevtools } from "react-query/devtools";
import Navigation from "./components/Navigation/Navigation";
import { useState } from "react";
function App() {
  const [currentTheme, setThemeMode] = useState(true);
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        retry: 0
      },
      queries: {
        retry: 0
      }
    }
  });

  console.log(
    "%cAhh my guy just stop, it's pointless",
    "color: red; font-weight: bold; font-size: 20px;"
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme ? themeLight : themeDark}>
        <CssBaseline />
        <Router>
          <Navigation currentTheme={currentTheme} setThemeMode={setThemeMode}>
            <Routes>
              <Route path="/" element={<LoginUserRedirect />} />
              <Route path="/vote" element={<Vote />} />
            </Routes>
          </Navigation>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
