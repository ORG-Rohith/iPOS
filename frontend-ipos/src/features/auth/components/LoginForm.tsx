import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useLoginForm } from "../hooks/useLoginForm";
import { LABELS, BRAND } from "../../../contants/messages";

const LoginForm = () => {
  const {
    formData,
    errors,
    isLoading,
    loginError,
    handleChange,
    handleSubmit,
  } = useLoginForm();

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

      <form onSubmit={handleSubmit} noValidate className="w-full">
        {/* Email */}
        <Input
          id="email"
          label={LABELS.email}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="admin@yourbusiness.com"
          error={errors.email}
          autoComplete="email"
        />

        {/* Password */}
        <Input
          id="password"
          label={LABELS.password}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          autoComplete="current-password"
        />

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="accent-[#e94560] w-4 h-4"
            />
            {LABELS.rememberMe}
          </label>
          <a
            href="/forgotpasword"
            className="text-sm text-[#e94560] font-semibold hover:underline"
          >
            {LABELS.forgotPassword}
          </a>
        </div>

        {/* Submit Button */}
        <Button type="submit" isLoading={isLoading}>
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
