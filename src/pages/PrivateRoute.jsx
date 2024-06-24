import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;
