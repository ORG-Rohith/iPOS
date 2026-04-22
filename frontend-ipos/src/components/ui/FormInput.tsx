import React from "react";

interface FormInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    id,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label
                htmlFor={id}
                className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide"
            >
                {label}
            </label>

            <input
                id={id}
                {...props}
                className={`w-full px-4 py-3 border-2 rounded-xl text-sm outline-none transition-all
        ${error
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-gray-200 focus:border-[#e94560]"
                    }`}
            />

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default FormInput;