import React from "react";

interface Option {
    label: string;
    value: string | number;
}

interface FormSelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: (string | Option)[];
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
                {options.map((opt, idx) => {
                    const label = typeof opt === "string" ? opt : opt.label;
                    const value = typeof opt === "string" ? opt : opt.value;
                    return (
                        <option key={idx} value={value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FormSelect;