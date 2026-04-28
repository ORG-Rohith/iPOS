import { useState } from "react";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
import { Label } from "../../../shared/components/ui/label";
import { useLoginForm } from "../hooks/useLoginForm";
import { LABELS, BRAND } from "../../../shared/constants/messages";
import { Eye, EyeOff } from "lucide-react";
import {
  AUTH_FORM_FIELDS,
  SHARED_FORM_CLASSES,
} from "../constants/auth.constants";
import { cn } from "../../../shared/utils/utils";
import { LOGIN_FORM_CLASSES } from "../constants/loginForm/loginForm.classes";
import { LOGIN_TEST_IDS } from "../constants/id's/loginForm.ids";

const LOGIN_CONTENT = {
  title: "Welcome Back",
  subtitle: "Sign in to your back office account",
  emailPlaceholder: "Enter your email address",
  passwordPlaceholder: "Enter your password",
  demoAccountsTitle: "Demo accounts",
};

const LoginForm = () => {
  const {
    formData,
    errors,
    isLoading,
    loginError,
    handleChange,
    handleSubmit,
  } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={LOGIN_FORM_CLASSES.container}>
      {/* Header */}
      <h2 className={LOGIN_FORM_CLASSES.heading}>
        {LOGIN_CONTENT.title}
      </h2>
      <p className={LOGIN_FORM_CLASSES.subheading}>
        {LOGIN_CONTENT.subtitle}
      </p>

      {/* Error Banner */}
      {loginError && (
        <div
          id={LOGIN_TEST_IDS.ERROR_BANNER}
          className={LOGIN_FORM_CLASSES.errorBanner}
        >
          {loginError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className={LOGIN_FORM_CLASSES.form}
      >
        {/* Email */}
        <div className={LOGIN_FORM_CLASSES.fieldGroup}>
          <Label
            htmlFor={LOGIN_TEST_IDS.EMAIL_INPUT}
            className={SHARED_FORM_CLASSES.label}
          >
            {LABELS.email}
          </Label>

          <Input
            id={LOGIN_TEST_IDS.EMAIL_INPUT}
            data-testid={LOGIN_TEST_IDS.EMAIL_INPUT}
            type="email"
            name={AUTH_FORM_FIELDS.EMAIL}
            value={formData.email}
            onChange={handleChange}
            placeholder={LOGIN_CONTENT.emailPlaceholder}
            className={cn(
              errors.email
                ? SHARED_FORM_CLASSES.inputError
                : SHARED_FORM_CLASSES.inputNormal
            )}
            autoComplete="email"
          />

          {errors.email && (
            <p className={SHARED_FORM_CLASSES.errorText}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className={LOGIN_FORM_CLASSES.fieldGroup}>
          <Label
            htmlFor={LOGIN_TEST_IDS.PASSWORD_INPUT}
            className={SHARED_FORM_CLASSES.label}
          >
            {LABELS.password}
          </Label>

          <div className="relative">
            <Input
              id={LOGIN_TEST_IDS.PASSWORD_INPUT}
              type={showPassword ? "text" : "password"}
              name={AUTH_FORM_FIELDS.PASSWORD}
              value={formData.password}
              onChange={handleChange}
              placeholder={LOGIN_CONTENT.passwordPlaceholder}
              className={cn(
                SHARED_FORM_CLASSES.inputPasswordPadding,
                errors.password
                  ? SHARED_FORM_CLASSES.inputError
                  : SHARED_FORM_CLASSES.inputNormal
              )}
              autoComplete="current-password"
            />

            <button
              id={LOGIN_TEST_IDS.TOGGLE_PASSWORD}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={LOGIN_FORM_CLASSES.passwordToggle}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={16} />
              ) : (
                <Eye size={16} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className={SHARED_FORM_CLASSES.errorText}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className={LOGIN_FORM_CLASSES.rememberWrapper}>
          <div className={LOGIN_FORM_CLASSES.checkboxWrapper}>
            <input
              type="checkbox"
              id={LOGIN_TEST_IDS.REMEMBER_ME}
              name={AUTH_FORM_FIELDS.REMEMBER_ME}
              checked={formData.rememberMe}
              onChange={handleChange}
              className={LOGIN_FORM_CLASSES.checkbox}
            />

            <Label
              htmlFor={LOGIN_TEST_IDS.REMEMBER_ME}
              className={LOGIN_FORM_CLASSES.rememberLabel}
            >
              {LABELS.rememberMe}
            </Label>
          </div>

          <a
            id={LOGIN_TEST_IDS.FORGOT_PASSWORD}
            href="/forgot-password"
            className={LOGIN_FORM_CLASSES.forgotPassword}
          >
            {LABELS.forgotPassword}
          </a>
        </div>

        {/* Submit */}
        <Button
          id={LOGIN_TEST_IDS.SUBMIT_BUTTON}
          type="submit"
          isLoading={isLoading}

          variant="customPrimary"
        >
          {isLoading ? LABELS.signingIn : LABELS.signIn}
        </Button>
      </form>

      {/* Divider */}
      <div className={LOGIN_FORM_CLASSES.divider}>
        <hr className={LOGIN_FORM_CLASSES.dividerLine} />
        <span className={LOGIN_FORM_CLASSES.dividerText}>
          {LOGIN_CONTENT.demoAccountsTitle}
        </span>
        <hr className={LOGIN_FORM_CLASSES.dividerLine} />
      </div>

      {/* Demo Roles */}
      <div className="flex flex-wrap gap-2 justify-center">
        {BRAND.demoRoles.map((role, index) => (
          <span key={index} className={LOGIN_FORM_CLASSES.demoBadge}>
            {role}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
