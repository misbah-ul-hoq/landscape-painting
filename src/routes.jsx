import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Signup from "./pages/SIgnup";
import PrivateRoute from "./pages/PrivateRoute";
import AddCraft from "./pages/AddCraft";
import MyCrafts from "./pages/MyCrafts";
import AllCrafts from "./components/AllCrafts";
import SingleArt from "./pages/SingleArt";
import UpdateCraft from "./pages/UpdateCraft";

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
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-craft",
        element: (
          <PrivateRoute>
            <AddCraft />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-crafts",
        element: (
          <PrivateRoute>
            <MyCrafts />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-arts",
        element: <AllCrafts />,
      },
      {
        path: "/arts/:id",
        element: (
          <PrivateRoute>
            {" "}
            <SingleArt />
          </PrivateRoute>
        ),
      },
      {
        path: "/arts/update/:id",
        element: (
          <PrivateRoute>
            <UpdateCraft />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
