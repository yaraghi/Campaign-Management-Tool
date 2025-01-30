import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./auth/RegisterPage";
import LoginPage from "./auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import useAuthStatus from "./hooks/useAuthStatus";

function App() {
  const isLoggedIn = useAuthStatus();

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={!isLoggedIn ? <Navigate to="/login" /> : <Dashboard />} />
    </Routes>
  );
}

export default App;
