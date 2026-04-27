import { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Label } from "../../../components/ui/label";
import { useLoginForm } from "../hooks/useLoginForm";
import { LABELS, BRAND } from "../../../contants/messages";
import { Eye, EyeOff } from "lucide-react";

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
    <div className="flex-1 bg-white flex flex-col items-center justify-center px-10 py-12">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#1a1a2e] mb-1">Welcome Back</h2>
      <p className="text-sm text-gray-400 mb-8">
        Sign in to your back office account
      </p>

      {/* Login Error Banner */}
      {loginError && (
        <div className="w-full mb-4 px-4 py-3 rounded-xl bg-[#fff0f3] border border-[#ffccd5] text-[#c73652] text-sm">
          {loginError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="w-full space-y-4">
        {/* Email */}
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
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {LABELS.password}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "border-red-400 focus-visible:ring-red-400 pr-10" : "border-gray-200 focus-visible:ring-[#e94560] pr-10"}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="accent-[#e94560] w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor="rememberMe" className="text-sm text-gray-500 cursor-pointer select-none font-normal">
              {LABELS.rememberMe}
            </Label>
          </div>
          <a
            href="/forgotpasword"
            className="text-sm text-[#e94560] font-semibold hover:underline"
          >
            {LABELS.forgotPassword}
          </a>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full bg-gradient-to-r from-[#e94560] to-[#c73652] text-white font-bold py-6 rounded-xl hover:opacity-90 transition-opacity"
        >
          {isLoading ? LABELS.signingIn : LABELS.signIn}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6 w-full">
        <hr className="flex-1 border-gray-200" />
        <span className="text-xs text-gray-400">Demo accounts</span>
        <hr className="flex-1 border-gray-200" />
      </div>

      {/* Demo Role Badges */}
      <div className="flex flex-wrap gap-2 justify-center">
        {BRAND.demoRoles.map((role, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f0f4ff] text-[#0f3460]"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
