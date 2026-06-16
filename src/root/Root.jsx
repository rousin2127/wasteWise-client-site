import { createBrowserRouter } from "react-router";
import RootLayOut from "../components/Layouts/rootLayOut/RootLayOut";
import Home from "../pages/home/Home/Home";
import AuthLayOut from "../components/Layouts/authLayOut/AuthLayOut";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "../components/routing/ProtectedRoute";
import RoleRoute from "../components/routing/RoleRoute";
import DashboardRedirect from "../pages/dashboard/DashboardRedirect";
import ResidentDashboard from "../pages/dashboard/resident/ResidentDashboard";
import CollectorDashboard from "../pages/dashboard/collector/CollectorDashboard";
import AdminDashboard from "../pages/dashboard/admin/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
        {
            index: true,
            element: <Home></Home>
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/resident",
          element: (
            <ProtectedRoute>
              <RoleRoute allow={["resident"]}>
                <ResidentDashboard />
              </RoleRoute>
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/collector",
          element: (
            <ProtectedRoute>
              <RoleRoute allow={["collector"]}>
                <CollectorDashboard />
              </RoleRoute>
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/admin",
          element: (
            <ProtectedRoute>
              <RoleRoute allow={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </ProtectedRoute>
          ),
        }
    ]
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  }
]);
export default router