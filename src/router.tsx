import { createBrowserRouter } from "react-router-dom";
import { Top } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
]);
