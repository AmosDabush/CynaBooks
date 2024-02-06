import React from "react";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "../theme/theme";
import { BooksProvider } from "./Context";
import { QueryClient, QueryClientProvider } from "react-query";

const Providers = ({
  darkMode,
  children,
}: {
  darkMode: boolean;
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <BooksProvider>{children}</BooksProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
