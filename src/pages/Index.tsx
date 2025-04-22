
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Role-based redirect
    switch (userRole) {
      case 'doctor':
        navigate("/appointments");
        break;
      case 'receptionist':
        navigate("/patients");
        break;
      case 'billing':
        navigate("/billing");
        break;
      case 'pharmacy':
        navigate("/pharmacy");
        break;
      case 'lab':
        navigate("/laboratory");
        break;
      case 'admin':
        navigate("/dashboard");
        break;
      default:
        navigate("/login");
    }
  }, [navigate, isAuthenticated, userRole]);

  return null;
};

export default Index;
