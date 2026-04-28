import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
import { Label } from "../../../shared/components/ui/label";
import { LABELS } from "../../../shared/constants/messages";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForgetPasswordForm } from "../../../features/auth/hooks/useForgetPasswordForm";

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

      <form noValidate className="w-full space-y-6">
        {/* EMAIL STEP */}
        {step === "email" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                {LABELS.email}
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@yourbusiness.com"
                className={errors.email ? "border-red-400 focus-visible:ring-red-400" : "border-gray-200 focus-visible:ring-[#e94560]"}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <Button
              type="button"
              onClick={handleSendOtp}
              className="w-full bg-gradient-to-r from-[#e94560] to-[#c73652] text-white font-bold py-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Send OTP
            </Button>
          </div>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Enter OTP
              </Label>
              <Input
                id="otp"
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="border-gray-200 focus-visible:ring-[#e94560]"
              />
            </div>

            <Button
              type="button"
              onClick={handleVerifyOtp}
              className="w-full bg-gradient-to-r from-[#e94560] to-[#c73652] text-white font-bold py-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Verify OTP
            </Button>
          </div>
        )}

        {/* VERIFIED STEP */}
        {step === "verified" && (
          <div className="space-y-4">
            <Button
              type="button"
              onClick={handleSendResetLink}
              className="w-full bg-gradient-to-r from-[#e94560] to-[#c73652] text-white font-bold py-6 rounded-xl hover:opacity-90 transition-opacity"
            >
              Send Reset Link
            </Button>
          </div>
        )}
      </form>

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
