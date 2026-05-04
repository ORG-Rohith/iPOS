import type { LoginFormData, LoginFormErrors } from "../types/auth.types";
import { VALIDATION_MESSAGES } from "../../../shared/constants/messages";

export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  if (!formData.email.trim()) {
    errors.email = VALIDATION_MESSAGES.email.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = VALIDATION_MESSAGES.email.invalid;
  }

  if (!formData.password) {
    errors.password = VALIDATION_MESSAGES.password.required;
  } else if (formData.password.length < 6) {
    errors.password = VALIDATION_MESSAGES.password.minLength;
  }

  return errors;
};
