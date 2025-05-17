import { createBrowserRouter } from "react-router";
import App from "./App";
import Stock from "./Stock";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/stock",
    element: <Stock />,
  },
]);
