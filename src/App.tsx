import { useEffect, useState } from "react";
import { Container, GlobalStyles } from "./styles/globalStyle";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { appRoutes, authRoutes } from "./routes";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./context/auth";

dayjs.locale("pt-br");
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export function App() {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    setLogged(token != null ? true : false);
  }, []);

  return (
    <AppProvider>
      <Container>
        <GlobalStyles />

        <RouterProvider router={logged ? appRoutes : authRoutes} />

        <ToastContainer theme="colored" position="bottom-right" />
      </Container>
    </AppProvider>
  );
}

