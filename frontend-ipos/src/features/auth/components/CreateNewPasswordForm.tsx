import { useState } from "react";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
import { Label } from "../../../shared/components/ui/label";
import { LABELS } from "../../../shared/constants/messages";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCreateNewPasswordForm } from "../hooks/useCreateNewPasswordForm";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../../shared/utils/utils";
import { CREATE_NEW_PASSWORD_FORM_CLASSES } from "../constants/createNewPasswordForm/createNewPasswordForm.classes";
import { CREATE_NEW_PASSWORD_TEST_IDS } from "../constants/id's/createNewPasswordForm.ids";
import { SHARED_FORM_CLASSES } from "../constants/auth.constants";

const CREATE_PASSWORD_CONTENT = {
  title: "Create New Password",
  subtitle: "Choose a strong password to secure your account",
  newPasswordPlaceholder: "Enter new password",
  confirmPasswordPlaceholder: "Re-enter new password",
};

const CreateNewPasswordForm = () => {
  const { formData, errors, isLoading, handleChange, validate } =
    useCreateNewPasswordForm();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checks = {
    length: formData.newPassword.length >= 8,
    upper: /[A-Z]/.test(formData.newPassword),
    lower: /[a-z]/.test(formData.newPassword),
    number: /[0-9]/.test(formData.newPassword),
    special: /[!@#$%^&*]/.test(formData.newPassword),
  };

  const getClass = (condition: boolean) =>
    condition ? "text-green-500" : "text-gray-400";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const token = searchParams.get("token");
    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Password reset successful");
      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={CREATE_NEW_PASSWORD_FORM_CLASSES.container}>
      {/* Header */}
      <h2 className={CREATE_NEW_PASSWORD_FORM_CLASSES.heading}>
        {CREATE_PASSWORD_CONTENT.title}
      </h2>
      <p className={CREATE_NEW_PASSWORD_FORM_CLASSES.subheading}>
        {CREATE_PASSWORD_CONTENT.subtitle}
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className={CREATE_NEW_PASSWORD_FORM_CLASSES.form}
      >
        {/* New Password */}
        <div className={CREATE_NEW_PASSWORD_FORM_CLASSES.fieldGroup}>
          <Label
            htmlFor={CREATE_NEW_PASSWORD_TEST_IDS.NEW_PASSWORD_INPUT}
            className={SHARED_FORM_CLASSES.label}
          >
            {LABELS.newPassword}
          </Label>

          <div className={CREATE_NEW_PASSWORD_FORM_CLASSES.inputWrapper}>
            <Input
              id={CREATE_NEW_PASSWORD_TEST_IDS.NEW_PASSWORD_INPUT}
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder={CREATE_PASSWORD_CONTENT.newPasswordPlaceholder}
              className={cn(
                SHARED_FORM_CLASSES.inputPasswordPadding,
                errors.newPassword
                  ? SHARED_FORM_CLASSES.inputError
                  : SHARED_FORM_CLASSES.inputNormal
              )}
              autoComplete="new-password"
            />

            <button
              id={CREATE_NEW_PASSWORD_TEST_IDS.TOGGLE_NEW_PASSWORD}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={CREATE_NEW_PASSWORD_FORM_CLASSES.passwordToggle}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.newPassword && (
            <p className={SHARED_FORM_CLASSES.errorText}>
              {errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className={CREATE_NEW_PASSWORD_FORM_CLASSES.fieldGroup}>
          <Label
            htmlFor={CREATE_NEW_PASSWORD_TEST_IDS.CONFIRM_PASSWORD_INPUT}
            className={SHARED_FORM_CLASSES.label}
          >
            {LABELS.confirmPassword}
          </Label>

          <div className={CREATE_NEW_PASSWORD_FORM_CLASSES.inputWrapper}>
            <Input
              id={CREATE_NEW_PASSWORD_TEST_IDS.CONFIRM_PASSWORD_INPUT}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={
                CREATE_PASSWORD_CONTENT.confirmPasswordPlaceholder
              }
              className={cn(
                SHARED_FORM_CLASSES.inputPasswordPadding,
                errors.confirmPassword
                  ? SHARED_FORM_CLASSES.inputError
                  : SHARED_FORM_CLASSES.inputNormal
              )}
              autoComplete="new-password"
            />

            <button
              id={CREATE_NEW_PASSWORD_TEST_IDS.TOGGLE_CONFIRM_PASSWORD}
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className={CREATE_NEW_PASSWORD_FORM_CLASSES.passwordToggle}
            >
              {showConfirmPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className={SHARED_FORM_CLASSES.errorText}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Password Rules + Submit */}
        <div className="space-y-6">
          <div className={CREATE_NEW_PASSWORD_FORM_CLASSES.requirementsBox}>
            <p
              className={
                CREATE_NEW_PASSWORD_FORM_CLASSES.requirementsTitle
              }
            >
              PASSWORD REQUIREMENTS
            </p>

            <ul
              className={
                CREATE_NEW_PASSWORD_FORM_CLASSES.requirementsList
              }
            >
              <li className={getClass(checks.length)}>
                {checks.length ? "✅" : "⭕"} At least 8 characters
              </li>
              <li className={getClass(checks.upper)}>
                {checks.upper ? "✅" : "⭕"} One uppercase letter
              </li>
              <li className={getClass(checks.lower)}>
                {checks.lower ? "✅" : "⭕"} One lowercase letter
              </li>
              <li className={getClass(checks.number)}>
                {checks.number ? "✅" : "⭕"} One number
              </li>
              <li className={getClass(checks.special)}>
                {checks.special ? "✅" : "⭕"} One special character (!@#$%^&*)
              </li>
            </ul>
          </div>

          <Button
            id={CREATE_NEW_PASSWORD_TEST_IDS.SUBMIT_BUTTON}
            type="submit"
            isLoading={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={
              !(
                checks.length &&
                checks.upper &&
                checks.lower &&
                checks.number &&
                checks.special &&
                formData.newPassword === formData.confirmPassword
              )
            }
          >
            {isLoading
              ? LABELS.resettingPassword
              : LABELS.resetPassword}
          </Button>
        </div>
      </form>

      {/* Back */}
      <div className={CREATE_NEW_PASSWORD_FORM_CLASSES.backWrapper}>
        <Link
          to="/login"
          id={CREATE_NEW_PASSWORD_TEST_IDS.BACK_TO_LOGIN_LINK}
        >
          <span className={CREATE_NEW_PASSWORD_FORM_CLASSES.backText}>
            ⭠ Back to Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CreateNewPasswordForm;