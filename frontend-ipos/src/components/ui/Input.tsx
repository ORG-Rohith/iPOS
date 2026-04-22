import { useState } from "react";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = ({ label, error, id, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full mb-5">
      <label
        htmlFor={id}
        className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={`w-full px-4 py-3 pr-10 border-2 rounded-xl text-sm text-gray-700 outline-none transition-all duration-200
          ${error
              ? "border-red-400 focus:border-red-500 bg-red-50"
              : "border-gray-200 focus:border-[#e94560]"
            }`}
        />

        {isPassword && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
