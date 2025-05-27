import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
const AuthLayout = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // If user is already authenticated, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Outlet renders the child routes
  return children;
};

export default AuthLayout;
