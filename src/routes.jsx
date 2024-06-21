import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

export default routes;
