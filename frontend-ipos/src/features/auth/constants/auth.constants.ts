export const AUTH_FORM_FIELDS = {
  EMAIL: "email",
  PASSWORD: "password",
  REMEMBER_ME: "rememberMe",
} as const;

export const SHARED_FORM_CLASSES = {
  inputNormal: "border-gray-200 focus-visible:ring-primary",
  inputError: "border-red-400 focus-visible:ring-red-400",
  inputPasswordPadding: "pr-10",
  errorText: "text-red-500 text-xs mt-1",
  label: "text-xs font-semibold text-gray-500 uppercase tracking-widest",
};


// shared/constants/uiClasses.ts

export const FORM_LAYOUT_CLASSES = {
  container: "flex-1 bg-white flex flex-col items-center justify-center px-10 py-12",
  form: "w-full space-y-4",
  formLargeGap: "w-full space-y-6",
  section: "space-y-4",
  fieldGroup: "space-y-2",
};

export const TEXT_CLASSES = {
  heading: "text-2xl font-bold text-app-text mb-1",
  subheading: "text-sm text-gray-400 mb-8",
  sectionTitle: "text-lg font-semibold text-app-text",
  sectionSubtitle: "text-sm text-gray-400 mb-4",
  label: "text-xs font-semibold text-gray-500 uppercase tracking-widest",
  error: "text-red-500 text-xs mt-1",
};

export const CARD_CLASSES = {
  base: "bg-white p-6 rounded-xl shadow-sm border-none",
};

export const BUTTON_CLASSES = {
  primary:
    "w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-6 rounded-xl hover:opacity-90 transition-opacity",
  secondary: "px-4 py-2 border rounded-lg",
};

export const INPUT_CLASSES = {
  normal: "border-gray-200 focus-visible:ring-primary",
  error: "border-red-400 focus-visible:ring-red-400",
  withIconPadding: "pr-10",
};

export const POSITION_CLASSES = {
  inputIcon:
    "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
};

export const DIVIDER_CLASSES = {
  container: "flex items-center gap-3 my-6 w-full",
  line: "flex-1 border-gray-200",
  text: "text-xs text-gray-400",
};