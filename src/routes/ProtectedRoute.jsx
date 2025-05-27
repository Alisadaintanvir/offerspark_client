// import { useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children, requiredRoles }) => {
//   const { user, isAuthenticated, isLoading } = useAuth(); // isLoading is important to prevent premature redirects
//   const location = useLocation();

//   if (isLoading) {
//     // Show a loading spinner or a blank page while auth state is being determined
//     return <div>Loading authentication status...</div>; // Or a proper loading component
//   }

//   if (!isAuthenticated) {
//     // User not logged in, redirect to login page
//     // Pass the current location so we can redirect back after login
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Check if the route requires specific roles and if the user has one of them
//   if (requiredRoles && requiredRoles.length > 0) {
//     // Assuming user object has a 'role' property e.g., user.role = 'admin'
//     // Or user.roles = ['admin', 'editor'] if a user can have multiple roles
//     const userHasRequiredRole = requiredRoles.some(
//       (role) => user.role === role
//     ); // Adjust if user.roles is an array

//     if (!userHasRequiredRole) {
//       // User does not have the required role, redirect to an unauthorized page or dashboard
//       // You might want to show a specific "Access Denied" page
//       return (
//         <Navigate to="/dashboard" state={{ error: "unauthorized" }} replace />
//       );
//       // Or: return <Navigate to="/unauthorized" replace />;
//     }
//   }

//   // User is authenticated and has the required role (if any)
//   return children;
// };

// export default ProtectedRoute;
