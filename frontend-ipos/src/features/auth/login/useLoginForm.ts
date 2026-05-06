import { useState } from "react";
import type { LoginFormData, LoginFormErrors } from "../types/auth.types";
import { validateLoginForm } from "./login.validation";
import { DEMO_CREDENTIALS } from "../../../shared/constants/messages";
import { useNavigate } from "react-router-dom";

const INITIAL_FORM_DATA: LoginFormData = {
  email: DEMO_CREDENTIALS.email,
  password: DEMO_CREDENTIALS.password,
  rememberMe: true,
};

type LoginResponse = {
  accessToken: string;
  tokenType: string;
  user: {
    id: number;
    uuid: string;
    email: string;
    name: string;
    tenantId: number | null;
    tenantName: string | null;
    roles: { roleId: number; roleName: string; outletId: number | null }[];
    permissions: any[];
  };
};

export const useLoginForm = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  console.log("VITE_API_BASE_URL:", baseUrl);

  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field error on change
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear login error on change
    if (loginError) setLoginError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      setLoginError("");

      // await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          // include rememberMe only if your backend expects it
          // rememberMe: formData.rememberMe,
        }),
      });

      const data = (await res.json()) as LoginResponse;
      if (!res.ok) {
        // backend might send message like { message: "Invalid credentials" }
        setLoginError(data ? "Invalid email or password." : "Login failed.");
        return;
      }
      // Save token (simple approach; adapt to your auth pattern)
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("tokenType", data.tokenType);
      localStorage.setItem("user", JSON.stringify(data.user));

      // check super admin role
      const roleNames = data.user.roles.map((r) => r.roleName);
      const isSuperAdmin = roleNames.some(
        (r) =>
          r.toLowerCase().includes("support admin") ||
          r.toLowerCase().includes("super admin") ||
          r.toLowerCase().includes("platform admin")
      );

      const isTenantAdmin = roleNames.some(
        (r) => r.toLowerCase().includes("tenant admin")
      );

      if (!isSuperAdmin && !isTenantAdmin) {
        setLoginError(
          "Access denied. Only Super Admin or Tenant Admin can access this dashboard.",
        );
        // optionally clear stored auth
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenType");
        localStorage.removeItem("user");
        return;
      }

      console.log("Login successful:", data);
      if (isTenantAdmin && !isSuperAdmin) {
        navigate("/outlets");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginError("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    loginError,
    handleChange,
    handleSubmit,
  };
};
