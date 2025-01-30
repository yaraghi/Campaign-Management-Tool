import { useState, useEffect } from "react";

function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("token"));

    window.addEventListener("storage", checkAuth); 
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return isAuthenticated;
}

export default useAuthStatus;
