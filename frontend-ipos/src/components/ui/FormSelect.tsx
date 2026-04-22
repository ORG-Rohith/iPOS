import React from "react";

interface FormSelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: string[];
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    options,
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

            <select
                id={id}
                {...props}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm outline-none focus:border-[#e94560]"
            >
                <option value="">Select {label}</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;