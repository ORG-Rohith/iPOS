import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { LABELS } from "../../../contants/messages";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForgetPasswordForm } from "../hooks/useForgetPasswordForm";

const ForgetPasswordForm = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const { formData, errors, handleChange, validateEmail } =
    useForgetPasswordForm();
  const navigator = useNavigate();

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
    navigator("/login");
  };

  return (
    <div className="flex-1 bg-white flex flex-col items-center justify-center px-10 py-12">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-1">Reset Password</h2>
      <p className="text-sm text-gray-400 mb-8">
        Enter your email to receive password reset link
      </p>

      {/* Login Error Banner
      {onerror && (
        <div className="w-full mb-4 px-4 py-3 rounded-xl bg-[#fff0f3] border border-[#ffccd5] text-[#c73652] text-sm">
          {onerror}
        </div>
      )} */}

      <form noValidate className="w-full">
        {/* EMAIL STEP */}
        {step === "email" && (
          <>
            <Input
              id="email"
              label={LABELS.email}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@yourbusiness.com"
              error={errors.email}
              required
            />

            <Button type="button" onClick={handleSendOtp}>
              Send OTP
            </Button>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <Input
              id="otp"
              label="Enter OTP"
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
            />

            <Button type="button" onClick={handleVerifyOtp}>
              Verify OTP
            </Button>
          </>
        )}

        {/* VERIFIED STEP */}
        {step === "verified" && (
          <>
            <Button type="button" onClick={handleSendResetLink}>
              Send Reset Link
            </Button>
          </>
        )}
      </form>

      {/* Divider */}
      {/* <div className="flex items-center gap-2 my-5">
        <span className="bg-gradient-to-r from-[#e94560] to-[#c73652] bg-clip-text text-transparent font-bold">
          Back to Login
        </span>
      </div> */}
      <div className="flex items-center gap-2 my-5">
        <Link to="/login">
          <span className="bg-gradient-to-r from-[#e94560] to-[#c73652] bg-clip-text text-transparent font-bold">
            Back to Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
