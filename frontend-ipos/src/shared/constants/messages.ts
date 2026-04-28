export const VALIDATION_MESSAGES = {
  email: {
    required: "Email is required.",
    invalid: "Enter a valid email address.",
  },
  password: {
    required: "Password is required.",
    minLength: "Password must be at least 6 characters.",
  },
};

export const LABELS = {
  email: "Email Address",
  password: "Password",
  rememberMe: "Remember me",
  forgotPassword: "Forgot Password?",
  signIn: "Sign In to Back Office",
  signingIn: "Signing in...",
  sendResetLink: "Send Reset Link",
  sendingLink: "Sending link...",
  newPassword: "NEW PASSWORD",
  confirmPassword: " CONFIRM PASSWORD",
  resetPassword: "Reset Password",
  resettingPassword: "Resetting password...",
};

export const BRAND = {
  logo: "🏪",
  name: "iPOSPlatform",
  tagline: "Multi-tenant POS for Retail and Food & Beverage",
  features: [
    "Multi-tenant and multi-outlet",
    "Offline + online capability",
    "India and Australia ready",
    "Android and Windows POS",
    "Retail and F&B modes",
  ],
  demoRoles: ["Tenant Admin", "Outlet Manager", "Accountant"],
};

export const DEMO_CREDENTIALS = {
  // email: "admin@demo.com",
  // password: "password",
  email: "",
  password: "",
};
