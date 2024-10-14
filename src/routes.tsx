import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { LayoutDashboard } from "./components/LayoutDashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ReceivedRequests } from "./pages/ReceivedRequests";
import { SendRequest } from "./pages/SendRequest";
import { Account } from "./pages/Account";

export const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <Account />,
      },
      {
        path: "received-requests",
        element: <ReceivedRequests />,
      },
      {
        path: "send-request",
        element: <SendRequest />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
