import { useState } from "react";
import { Input } from "../../../shared/components/ui/Input";
import { Button } from "../../../shared/components/ui/Button";
import { Label } from "../../../shared/components/ui/label";
import { LABELS } from "../../../shared/constants/messages";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCreateNewPasswordForm } from "../hooks/useCreateNewPasswordForm";
import { Eye, EyeOff } from "lucide-react";

const CreateNewPasswordForm = () => {
  const { formData, errors, isLoading, handleChange, validate } =
    useCreateNewPasswordForm();
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
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
    const token = searchParams.get("token"); // ✅ get token from URL
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
          token, // ✅ IMPORTANT
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Password reset successful");
      navigator("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col items-center justify-center px-10 py-12">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-1">
        Create New Password
      </h2>
      <p className="text-sm text-gray-400 mb-8">
        Choose a strong password to secure your account
      </p>

      <form onSubmit={handleSubmit} noValidate className="w-full space-y-4">
        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {LABELS.newPassword}
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className={errors.newPassword ? "border-red-400 focus-visible:ring-red-400 pr-10" : "border-gray-200 focus-visible:ring-[#e94560] pr-10"}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {LABELS.confirmPassword}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
              className={errors.confirmPassword ? "border-red-400 focus-visible:ring-red-400 pr-10" : "border-gray-200 focus-visible:ring-[#e94560] pr-10"}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="space-y-6">
          {/* Password Requirements */}
          <div className="bg-gray-100 rounded-xl p-4 text-sm">
            <p className="font-semibold mb-2 text-gray-600">
              PASSWORD REQUIREMENTS
            </p>

            <ul className="space-y-1">
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

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-gradient-to-r from-[#e94560] to-[#c73652] text-white font-bold py-6 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
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
            {isLoading ? LABELS.resettingPassword : LABELS.resetPassword}
          </Button>
        </div>
      </form>

      <div className="flex items-center gap-2 my-5">
        <Link to="/login">
          <span className="bg-gradient-to-r from-[#e94560] to-[#c73652] bg-clip-text text-transparent font-bold">
            ⭠ Back to Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CreateNewPasswordForm;
