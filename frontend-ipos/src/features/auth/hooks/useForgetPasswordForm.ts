// hooks/useForgetPasswordForm.ts
import { useState } from "react";

export const useForgetPasswordForm = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error on typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateEmail = () => {
    if (!formData.email) {
      setErrors({ email: "Email is required" });
      return false;
    }
    return true;
  };

  return {
    formData,
    errors,
    setErrors,
    isLoading,
    handleChange,
    validateEmail,
    setIsLoading,
  };
};
