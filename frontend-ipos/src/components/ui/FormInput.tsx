import React from "react";
import { Input } from "./Input";
import { Label } from "./label";
import { cn } from "../../lib/utils";

interface FormInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
    label,
    error,
    id,
    className,
    ...props
}) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <Label
                htmlFor={id}
                className="text-[12px] font-semibold text-gray-600 uppercase tracking-wide"
            >
                {label}
            </Label>

            <Input
                id={id}
                {...props}
                className={cn(
                    "w-full px-4 py-3 border-2 rounded-xl text-sm outline-none transition-all h-auto",
                    error
                        ? "border-red-400 bg-red-50 focus-visible:ring-red-500"
                        : "border-gray-200 focus-visible:ring-[#e94560]",
                    className
                )}
            />

            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default FormInput;