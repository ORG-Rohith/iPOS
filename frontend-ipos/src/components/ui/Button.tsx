interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    disabled={isLoading || disabled}
    className={`w-full py-3.5 rounded-xl text-white text-sm font-bold tracking-wide transition-all duration-200
      bg-gradient-to-r from-[#e94560] to-[#c73652]
      flex items-center justify-center gap-2
      ${
        isLoading || disabled
          ? "opacity-70 cursor-not-allowed"
          : "hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(233,69,96,0.4)]"
      }`}
  >
    {isLoading && (
      <svg
        className="animate-spin h-4 w-4 text-white"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
    )}
    {children}
  </button>
);

export default Button;
