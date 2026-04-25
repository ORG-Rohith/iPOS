import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import { SuperAdminDashboard } from "../pages/DashboardPage";
import ForgetPasswordPage from "../features/auth/ForgetPasswordPage";
import CreateNewPassword from "../features/auth/CreateNewPasswordPage";
import { TenantsPage } from "../pages/TenantsPage";
import { CreateTenantPage } from "../pages/CreateTenantPage";
import TenantDetailsPage from "../pages/TenantDetailsPage";
import EditTenantPage from "../pages/EditTenantPage";
import { OutletsPage } from "../pages/OutletsPage";
import OutletsDetailsPage from "../pages/OutletsDetailsPage";
import OutletFormPage from "../features/outlets/pages/OutletFormPage";

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
