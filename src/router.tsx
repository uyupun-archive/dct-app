import { createBrowserRouter } from "react-router-dom";
import { Top, Think, Answer } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/think",
    element: <Think />,
  },
  {
    path: "/answer",
    element: <Answer />,
  },
]);
