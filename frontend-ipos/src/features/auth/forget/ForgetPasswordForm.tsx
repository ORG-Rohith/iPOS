
import { useState } from "react";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
import { Label } from "../../../shared/components/ui/label";
import { LABELS } from "../../../shared/constants/messages";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordForm } from "./useForgetPasswordForm";
import {
  AUTH_FORM_FIELDS,
  SHARED_FORM_CLASSES,
} from "../constants/auth.constants";
import { cn } from "../../../shared/utils/utils";
import { FORGET_PASSWORD_FORM_CLASSES } from "../constants/forgetPasswordForm/forgetPasswordForm.classes";
import { FORGET_PASSWORD_TEST_IDS } from "../constants/id's/forgetPasswordForm.ids";

const FORGET_PASSWORD_CONTENT = {
  title: "Reset Password",
  subtitle: "Enter your email to receive password reset link",
  emailPlaceholder: "admin@yourbusiness.com",
  otpLabel: "Enter OTP",
  otpPlaceholder: "Enter 6-digit OTP",
  sendOtpButton: "Send OTP",
  verifyOtpButton: "Verify OTP",
  sendResetLinkButton: "Send Reset Link",
  backToLogin: "Back to Login",
};

const ForgetPasswordForm = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { formData, errors, handleChange, validateEmail } =
    useForgetPasswordForm();
  const navigate = useNavigate();

  const [step, setStep] = useState<"email" | "otp" | "verified">("email");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!validateEmail()) return;

    await fetch(`${baseUrl}/auth/send-otp`, {
      method: "POST",
      body: JSON.stringify({ email: formData.email }),
      headers: { "Content-Type": "application/json" },
    });

    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    const res = await fetch(`${baseUrl}/auth/verify-otp`, {
      method: "POST",
      body: JSON.stringify({ email: formData.email, otp }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.message === "OTP verified") {
      setStep("verified");
    }
  };

  const handleSendResetLink = async () => {
    await fetch(`${baseUrl}/auth/send-reset-link`, {
      method: "POST",
      body: JSON.stringify({ email: formData.email }),
      headers: { "Content-Type": "application/json" },
    });

    navigate("/login");
  };

  return (
    <div className={FORGET_PASSWORD_FORM_CLASSES.container}>
      {/* Header */}
      <h2 className={FORGET_PASSWORD_FORM_CLASSES.heading}>
        {FORGET_PASSWORD_CONTENT.title}
      </h2>
      <p className={FORGET_PASSWORD_FORM_CLASSES.subheading}>
        {FORGET_PASSWORD_CONTENT.subtitle}
      </p>

      <form noValidate className={FORGET_PASSWORD_FORM_CLASSES.form}>
        {/* EMAIL STEP */}
        {step === "email" && (
          <div className={FORGET_PASSWORD_FORM_CLASSES.section}>
            <div className={FORGET_PASSWORD_FORM_CLASSES.fieldGroup}>
              <Label
                htmlFor={FORGET_PASSWORD_TEST_IDS.EMAIL_INPUT}
                className={SHARED_FORM_CLASSES.label}
              >
                {LABELS.email}
              </Label>

              <Input
                id={FORGET_PASSWORD_TEST_IDS.EMAIL_INPUT}
                type="email"
                name={AUTH_FORM_FIELDS.EMAIL}
                value={formData.email}
                onChange={handleChange}
                placeholder={FORGET_PASSWORD_CONTENT.emailPlaceholder}
                className={cn(
                  errors.email
                    ? SHARED_FORM_CLASSES.inputError
                    : SHARED_FORM_CLASSES.inputNormal
                )}
                required
              />

              {errors.email && (
                <p className={SHARED_FORM_CLASSES.errorText}>
                  {errors.email}
                </p>
              )}
            </div>

            <Button
              id={FORGET_PASSWORD_TEST_IDS.SEND_OTP_BUTTON}
              type="button"
              onClick={handleSendOtp}
              variant="customPrimary"
            >
              {FORGET_PASSWORD_CONTENT.sendOtpButton}
            </Button>
          </div>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <div className={FORGET_PASSWORD_FORM_CLASSES.section}>
            <div className={FORGET_PASSWORD_FORM_CLASSES.fieldGroup}>
              <Label
                htmlFor={FORGET_PASSWORD_TEST_IDS.OTP_INPUT}
                className={SHARED_FORM_CLASSES.label}
              >
                {FORGET_PASSWORD_CONTENT.otpLabel}
              </Label>

              <Input
                id={FORGET_PASSWORD_TEST_IDS.OTP_INPUT}
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder={FORGET_PASSWORD_CONTENT.otpPlaceholder}
                className={SHARED_FORM_CLASSES.inputNormal}
              />
            </div>

            <Button
              id={FORGET_PASSWORD_TEST_IDS.VERIFY_OTP_BUTTON}
              type="button"
              onClick={handleVerifyOtp}
              variant="customPrimary"
            >
              {FORGET_PASSWORD_CONTENT.verifyOtpButton}
            </Button>
          </div>
        )}

        {/* VERIFIED STEP */}
        {step === "verified" && (
          <div className={FORGET_PASSWORD_FORM_CLASSES.section}>
            <Button
              id={FORGET_PASSWORD_TEST_IDS.SEND_RESET_LINK_BUTTON}
              type="button"
              onClick={handleSendResetLink}
              variant="customPrimary"
            >
              {FORGET_PASSWORD_CONTENT.sendResetLinkButton}
            </Button>
          </div>
        )}
      </form>

      {/* Back to Login */}
      <div className={FORGET_PASSWORD_FORM_CLASSES.backWrapper}>
        <Link
          to="/login"
          id={FORGET_PASSWORD_TEST_IDS.BACK_TO_LOGIN_LINK}
        >
          <span className={FORGET_PASSWORD_FORM_CLASSES.backText}>
            {FORGET_PASSWORD_CONTENT.backToLogin}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;