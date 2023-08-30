import { createBrowserRouter } from "react-router-dom";
import PublicPage from "../pages/PublicPage";
import EtaPage from "../pages/EtaPage";
import Layout from "../layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PublicPage />,
      },
      {
        path: "/eta",
        element: <EtaPage />,
      },
    ],
  },
]);
