import React, { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
// import Shell from "./pages/layout/Shell";
import "./styles/App.scss";
import { createTheme, ThemeProvider } from "@mui/material";
import CustomProvider from "./context/providers/CustomProvider";
import PayLoading from "./components/PayLoading";

const Shell = React.lazy(() => import("./pages/layout/Shell"));

function App() {
  const queryClient = new QueryClient();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#333",
        contrastText: "#fff",
      },
      secondary: {
        main: "#008000",
        contrastText: "#fff",
      },
    },

    typography: {
      fontFamily: `"Poppins", "Arial", "Roboto", "Helvetica", sans-serif`,
      fontSize: 14,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 500,

      button: {
        textTransform: "capitalize",
        color: "#333",
      },
   
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
          fullWidth: true,
          sx: {
            fontSize: "14px",
            color: "#5F6368",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          // fullWidth:true,
          disableElevation: true,
          size: "large",
          sx: {
            paddingX: 2,
          },
        },
      },
      MuiFormLabel: {
        defaultProps: {
          sx: {
            color: "#008000",
          },
        },
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CustomProvider>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<PayLoading />}>
              <Shell />
            </Suspense>
          </ThemeProvider>
        </CustomProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
