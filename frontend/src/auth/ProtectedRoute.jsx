import { Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStatus();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
