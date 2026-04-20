import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import { SuperAdminDashboard } from "../pages/DashboardPage";
import ForgetPasswordPage from "../features/auth/ForgetPasswordPage";
import CreateNewPassword from "../features/auth/CreateNewPasswordPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<SuperAdminDashboard />} />
      <Route path="/forgotpasword" element={<ForgetPasswordPage />} />
      <Route path="/reset-password" element={<CreateNewPassword />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
