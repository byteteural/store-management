import { createHashRouter } from "react-router";
import App from "./App";
import Store from "./Store";
import Stock from "./Stock";
import NotFound from "./views/NotFound";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/stock",
    element: <Stock />,
  },
]);
