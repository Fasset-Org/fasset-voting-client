import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { themeDark, themeLight } from "./theme";
import LoginUserRedirect from "./pages/Auth/LoginUserRedirect";
import Vote from "./pages/Vote/Vote";
import { ReactQueryDevtools } from 'react-query/devtools'
function App() {
  const theme = localStorage.getItem("theme") || "light";
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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === "light" ? themeLight : themeDark}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/vote" element={<Vote />} />
            <Route path="/" element={<LoginUserRedirect />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
