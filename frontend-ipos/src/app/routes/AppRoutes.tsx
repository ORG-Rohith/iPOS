import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import LoginPage from "../../features/auth/pages/LoginPage";
import ForgetPasswordPage from "../../features/auth/pages/ForgetPasswordPage";
import CreateNewPassword from "../../features/auth/pages/CreateNewPasswordPage";

// Dashboard
import { SuperAdminDashboard } from "../../features/dashboard/pages/DashboardPage";

// Tenant pages
import { TenantsPage } from "../../features/tenants/pages/TenantsPage";
import { CreateTenantPage } from "../../features/tenants/pages/CreateTenantPage";
import TenantDetailsPage from "../../features/tenants/pages/TenantDetailsPage";
import EditTenantPage from "../../features/tenants/pages/EditTenantPage";

// Outlet pages
import { OutletsPage } from "../../features/outlets/pages/OutletsPage";
import OutletsDetailsPage from "../../features/outlets/pages/OutletsDetailsPage";
import OutletFormPage from "../../features/outlets/pages/OutletFormPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/tenants" element={<TenantsPage />} />
      <Route path="/tenants/create" element={<CreateTenantPage />} />
      <Route path="/tenants/edit/:id" element={<EditTenantPage />} />
      <Route path="/tenants/manage/:id" element={<TenantDetailsPage />} />
      <Route path="/outlets" element={<OutletsPage />} />
      <Route path="/outlets/create" element={<OutletFormPage />} />
      <Route path="/outlets/edit/:id" element={<OutletFormPage />} />
      <Route path="/outlets/manage/:id" element={<OutletsDetailsPage />} />
      <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      <Route path="/reset-password" element={<CreateNewPassword />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
