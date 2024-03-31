import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { reactQueryConfig } from "./configs/reactQuery";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./configs/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

export const queryClient = new QueryClient(reactQueryConfig);
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </>
);
