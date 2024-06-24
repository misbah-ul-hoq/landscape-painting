import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  //   const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <span className="loading loading-spinner text-secondary"></span>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
