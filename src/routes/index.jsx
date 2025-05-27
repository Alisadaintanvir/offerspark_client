// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import AuthLayout from "../layouts/AuthLayout";
// import ProtectedLayout from "../layouts/ProtectedLayout";
// import SidebarLayout from "../layouts/SidebarLayout";

// // Auth Pages
// import LoginPage from "../pages/auth/LoginPage";

// // Dashboard Pages
// import Dashboard from "../features/dashboard/page/Dashboard";
// import UsersPage from "../features/user/page/UsersPage";
// import RolesPage from "../features/roles/page/RolesPage";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Auth routes */}
//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<LoginPage />} />
//       </Route>

//       {/* Protected routes with Sidebar */}
//       <Route element={<ProtectedLayout />}>
//         <Route element={<SidebarLayout />}>
//           <Route index element={<Navigate to="/dashboard" replace />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/users" element={<UsersPage />} />
//           <Route path="/roles" element={<RolesPage />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { appRoutes } from "./appRoutes";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Router>
      {/* Optional: Suspense for lazy loading routes if you implement it */}
      {/* <Suspense fallback={<FullPageSpinner />}> */}
      <Routes>
        {appRoutes.map((route, index) => {
          const {
            element,
            path,
            layout: LayoutComponent,
            requiredRoles,
            isPublic,
          } = route;
          const pageContent = LayoutComponent ? (
            <LayoutComponent>{element}</LayoutComponent>
          ) : (
            element
          );

          if (isPublic) {
            // Public routes like /login don't need ProtectedRoute
            return <Route key={index} path={path} element={pageContent} />;
          }

          // Protected routes
          return (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute requiredRoles={requiredRoles}>
                  {pageContent}
                </ProtectedRoute>
              }
            />
          );
        })}

        {/* Default redirect for authenticated users if they hit the root path */}
        {/* Or a dedicated landing page for authenticated users */}
        <Route
          path="/"
          element={
            <ProtectedRoute requiredRoles={[]}>
              {" "}
              {/* No specific roles, just needs auth */}
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />

        {/* Catch-all 404 Route - ensure it's last */}
        {/*
        <Route
          path="*"
          element={
            <AdminLayout> {/* Or a more generic layout for 404 *}
              {/* <NotFoundPage /> *}
              <div>404 - Page Not Found</div> {/* Placeholder for NotFoundPage *}
            </AdminLayout>
          }
        />
        */}
      </Routes>
      {/* </Suspense> */}
    </Router>
  );
};

export default AppRouter;
