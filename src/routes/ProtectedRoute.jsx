import { useLocation, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const isLoading = useAuthStore((state) => state.isLoading);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const location = useLocation();

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!isAuthenticated) {
    // User not logged in, redirect to login page
    // Pass the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the route requires specific roles and if the user has one of them
  if (requiredRoles && requiredRoles.length > 0) {
    // Allow super_admin or admin to access all
    if (user.is_super_admin || user.role === "admin") {
      return children;
    }
    // Assuming user object has a 'role' property e.g., user.role = 'admin'
    // Or user.roles = ['admin', 'editor'] if a user can have multiple roles
    const userHasRequiredRole = requiredRoles.some(
      (role) => user.role === role
    ); // Adjust if user.roles is an array

    if (!userHasRequiredRole) {
      // User does not have the required role, redirect to an unauthorized page
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has the required role (if any)
  return children;
};

export default ProtectedRoute;
