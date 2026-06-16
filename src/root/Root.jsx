import { createBrowserRouter } from "react-router";
import RootLayOut from "../components/Layouts/rootLayOut/RootLayOut";
import Home from "../pages/home/Home/Home";
import Features from "../pages/site/Features";
import HowItWorks from "../pages/site/HowItWorks";
import About from "../pages/site/About";
import Contact from "../pages/site/Contact";
import AuthLayOut from "../components/Layouts/authLayOut/AuthLayOut";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedRoute from "../components/routing/ProtectedRoute";
import RoleRoute from "../components/routing/RoleRoute";
import DashboardLayout from "../components/Layouts/dashboardLayout/DashboardLayout";
import DashboardRedirect from "../pages/dashboard/DashboardRedirect";

import ResidentOverview from "../pages/dashboard/resident/ResidentOverview";
import ResidentOnDemand from "../pages/dashboard/resident/ResidentOnDemand";
import ResidentPayments from "../pages/dashboard/resident/ResidentPayments";
import ResidentComplaints from "../pages/dashboard/resident/ResidentComplaints";
import ResidentQr from "../pages/dashboard/resident/ResidentQr";

import CollectorOverview from "../pages/dashboard/collector/CollectorOverview";
import CollectorTasksPage from "../pages/dashboard/collector/CollectorTasksPage";
import CollectorScan from "../pages/dashboard/collector/CollectorScan";

import AdminOverview from "../pages/dashboard/admin/AdminOverview";
import AdminResidents from "../pages/dashboard/admin/AdminResidents";
import AdminCollectors from "../pages/dashboard/admin/AdminCollectors";
import AdminZones from "../pages/dashboard/admin/AdminZones";
import AdminOnDemand from "../pages/dashboard/admin/AdminOnDemand";
import AdminComplaints from "../pages/dashboard/admin/AdminComplaints";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "features", element: <Features /> },
      { path: "how-it-works", element: <HowItWorks /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/",
    Component: AuthLayOut,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
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
          <DashboardLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ResidentOverview /> },
      { path: "on-demand", element: <ResidentOnDemand /> },
      { path: "payments", element: <ResidentPayments /> },
      { path: "complaints", element: <ResidentComplaints /> },
      { path: "qr", element: <ResidentQr /> },
    ],
  },
  {
    path: "dashboard/collector",
    element: (
      <ProtectedRoute>
        <RoleRoute allow={["collector"]}>
          <DashboardLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CollectorOverview /> },
      { path: "tasks", element: <CollectorTasksPage /> },
      { path: "scan", element: <CollectorScan /> },
    ],
  },
  {
    path: "dashboard/admin",
    element: (
      <ProtectedRoute>
        <RoleRoute allow={["admin"]}>
          <DashboardLayout />
        </RoleRoute>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminOverview /> },
      { path: "residents", element: <AdminResidents /> },
      { path: "collectors", element: <AdminCollectors /> },
      { path: "zones", element: <AdminZones /> },
      { path: "on-demand", element: <AdminOnDemand /> },
      { path: "complaints", element: <AdminComplaints /> },
    ],
  },
]);

export default router;
