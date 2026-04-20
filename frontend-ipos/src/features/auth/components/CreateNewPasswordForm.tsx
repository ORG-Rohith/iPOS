import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { LABELS } from "../../../contants/messages";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCreateNewPasswordForm } from "../hooks/useCreateNewPasswordForm";

const CreateNewPasswordForm = () => {
  const { formData, errors, isLoading, handleChange, validate } =
    useCreateNewPasswordForm();
  const [searchParams] = useSearchParams();
  const navigator = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

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

      <form onSubmit={handleSubmit} noValidate className="w-full">
        {/* Password */}
        <Input
          id="newPassword"
          label={LABELS.newPassword}
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          error={errors.newPassword}
          autoComplete="current-password"
        />
        <Input
          id="confirmPassword"
          label={LABELS.confirmPassword}
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter new password"
          error={errors.confirmPassword}
          autoComplete="current-password"
        />

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
            className="w-full bg-pink-400 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
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
