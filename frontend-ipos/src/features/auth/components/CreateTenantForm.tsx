// // CreateTenantForm.tsx
// import React, { useState } from "react";
// import type { CreateTenantPayload } from "../types/tenant.types";

// interface Props {
//     onSubmit: (data: CreateTenantPayload) => void;
// }

// const CreateTenantForm: React.FC<Props> = ({ onSubmit }) => {
//     const [form, setForm] = useState<CreateTenantPayload>({
//         businessName: "",
//         legalName: "",
//         businessType: "",
//         registrationNumber: "",
//         taxId: "",
//         contactName: "",
//         email: "",
//         phone: "",
//         website: "",
//     });

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(form);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">

//             {/* 🔥 BUSINESS INFO */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">
//                 {/* 🔥 HEADER */}
//                 <div className="mb-4">
//                     <div className="flex flex-col gap-[2px]">
//                         <h2 className="font-semibold text-lg text-[#1a1a2e]">
//                             Business Information                        </h2>
//                         <p className="text-[13px] text-gray-400">
//                             Core details about the tenant's business entity
//                         </p>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             BUSINESS NAME
//                         </label>
//                         <input
//                             name="businessName"
//                             placeholder="e.g. Business Name"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             LEGAL NAME
//                         </label>
//                         <input
//                             name="legalName"
//                             placeholder="e.g. Legal Name"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600 ">
//                             BUSINESS TYPE
//                         </label>
//                         <select name="businessType"
//                             onChange={handleChange} className="input gap-1.5">
//                             <option value="">Select Business Type</option>
//                             <option>Retail</option>
//                             <option>F&B</option>
//                         </select>
//                     </div>
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             REGISTRATION NUMBER
//                         </label>
//                         <input
//                             name="registrationNumber"
//                             placeholder="e.g. Registration Number"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             TAX ID (ABN  / GST)
//                         </label>
//                         <input
//                             name="taxId"
//                             placeholder="e.g. Tax ID"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                 </div>
//             </div>

//             {/* 🔥 CONTACT INFO */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">

//                 {/* 🔥 HEADER */}
//                 <div className="mb-4">
//                     <div className="flex flex-col gap-[2px]">
//                         <h2 className="font-semibold text-lg text-[#1a1a2e]">
//                             Contact Details
//                         </h2>
//                         <p className="text-[13px] text-gray-400">
//                             Primary contact information for the tenant
//                         </p>
//                     </div>
//                 </div>

//                 {/* 🔥 FORM GRID */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                     {/* Contact Name */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             PRIMARY CONTACT NAME
//                         </label>
//                         <input
//                             name="contactName"
//                             placeholder="e.g. John Smith"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                     {/* Email */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             EMAIL ADDRESS
//                         </label>
//                         <input
//                             name="email"
//                             placeholder="e.g. john@company.com"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                     {/* Phone */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-medium text-gray-600">
//                             PHONE NUMBER
//                         </label>
//                         <input
//                             name="phone"
//                             placeholder="e.g. +91 98765 43210"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                     {/* Website */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-medium text-gray-600">
//                             WEBSITE
//                         </label>
//                         <input
//                             name="website"
//                             placeholder="e.g. https://company.com"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                 </div>
//             </div>



//             {/* 🔥 LOCATION DETAILS */}
//             <div className="bg-white p-6 rounded-xl shadow-sm">

//                 {/* 🔥 HEADER */}
//                 <div className="mb-4">
//                     <div className="flex flex-col gap-[2px]">
//                         <h2 className="font-semibold text-lg text-[#1a1a2e]">
//                             Location
//                         </h2>
//                         <p className="text-[13px] text-gray-400">
//                             Business address and geographical information
//                         </p>
//                     </div>
//                 </div>

//                 {/* 🔥 FORM GRID */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                     {/* Contact Name */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             COUNTRY
//                         </label>
//                         <input
//                             name="country"
//                             placeholder="e.g. John Smith"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                     {/* Email */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-semibold text-gray-600">
//                             STATE / PROVINCE
//                         </label>
//                         <input
//                             name="state"
//                             placeholder="e.g. California"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                     {/* Phone */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-medium text-gray-600">
//                             CITY
//                         </label>
//                         <input
//                             name="city"
//                             placeholder="e.g. New York"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                     {/* Website */}
//                     <div className="flex flex-col gap-1.5">
//                         <label className="text-[12px] font-medium text-gray-600">
//                             POSTAL CODE
//                         </label>
//                         <input
//                             name="postalCode"
//                             placeholder="e.g. 123456"
//                             onChange={handleChange}
//                             className="input"
//                         />
//                     </div>

//                 </div>
//             </div>


//             {/* 🔥 ACTION */}
//             <div className="flex justify-end gap-3">
//                 <button type="button" className="px-4 py-2 border rounded-lg">
//                     Cancel
//                 </button>

//                 <button type="submit"
//                     className="px-5 py-2 bg-[#e94560] text-white rounded-lg">
//                     Create Tenant
//                 </button>
//             </div>

//         </form>
//     );
// };

// export default CreateTenantForm;
import React, { useState } from "react";
import type { CreateTenantPayload } from "../types/tenant.types";
import FormInput from "../../../components/ui/FormInput";
import FormSelect from "../../../components/ui/FormSelect";
import PlanCard from "../../../components/tenants/PlanCard";

interface Props {
    onSubmit: (data: CreateTenantPayload) => void;
}

const CreateTenantForm: React.FC<Props> = ({ onSubmit }) => {
    const [form, setForm] = useState<CreateTenantPayload>({
        businessName: "",
        legalName: "",
        businessType: undefined,
        registrationNumber: "",
        taxId: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        country_code: "",
        state: "",
        city: "",
        address: "",
        postalCode: "",
        plan: "Standard",
        billingCycle: "Monthly",
        // outlets: 1,
        currency: "",
        timezone: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* 🔥 BUSINESS */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-[#1a1a2e]">
                    Business Information
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                    Core details about the tenant's business entity
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormInput
                        id="businessName"
                        name="businessName"
                        label="Business Name"
                        value={form.businessName}
                        placeholder="Business Name"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="legalName"
                        name="legalName"
                        label="Legal Name"
                        placeholder="Legal Name"
                        value={form.legalName}
                        onChange={handleChange}
                    />

                    <FormSelect
                        id="businessType"
                        name="businessType"
                        label="Business Type"
                        options={["Retail", "F&B"]}
                        value={form.businessType}
                        onChange={handleChange}
                    />

                    <FormInput
                        id="registrationNumber"
                        name="registrationNumber"
                        label="Registration Number"
                        value={form.registrationNumber}
                        onChange={handleChange}
                    />

                    <FormInput
                        id="taxId"
                        name="taxId"
                        label="Tax ID (ABN / GST)"
                        value={form.taxId}
                        placeholder="No 123456789"
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* 🔥 CONTACT */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-[#1a1a2e]">
                    Contact Details
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                    Primary contact information for the tenant
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormInput
                        id="contactName"
                        name="contactName"
                        label="Contact Name"
                        value={form.contactName}
                        placeholder="Contact Name"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="email"
                        name="email"
                        label="Email"
                        value={form.email}
                        placeholder="[EMAIL_ADDRESS]"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={form.phone}
                        placeholder="Phone"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="website"
                        name="website"
                        label="Website"
                        value={form.website}
                        placeholder="Website"
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* 🔥 LOCATION */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-[#1a1a2e]">
                    Location
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                    Business address and geographical information
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormInput
                        id="country"
                        name="country"
                        label="Country"
                        value={form.country}
                        placeholder="Country"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="state"
                        name="state"
                        label="State"
                        value={form.state}
                        placeholder="State"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="city"
                        name="city"
                        label="City"
                        value={form.city}
                        placeholder="City"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="postalCode"
                        name="postalCode"
                        label="Postal Code"
                        value={form.postalCode}
                        placeholder="Postal Code"
                        onChange={handleChange}
                    />

                    <FormInput
                        id="address"
                        name="address"
                        label="Address"
                        value={form.address}
                        placeholder="Address"
                        onChange={handleChange}
                    />
                </div>
            </div>
            {/* 🔥 PLAN & BILLING */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="mb-4">
                    <h2 className="font-semibold text-lg text-[#1a1a2e]">
                        Plan & Billing
                    </h2>
                    <p className="text-[13px] text-gray-400">
                        Choose a subscription plan for this tenant
                    </p>
                </div>

                {/* PLAN CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <PlanCard
                        name="Standard"
                        price="$49/mo"
                        features={[
                            "Up to 3 outlets",
                            "10 devices per outlet",
                            "Basic analytics",
                            "Email support",
                            "Standard integrations"
                        ]}
                        selected={form.plan === "Standard"}
                        onClick={() => setForm({ ...form, plan: "Standard" })}
                    />

                    <PlanCard
                        name="Premium"
                        price="$99/mo"
                        features={[
                            "Up to 10 outlets",
                            "Unlimited devices",
                            "Advanced analytics",
                            "Priority support",
                            "All integrations",
                            "Custom branding"
                        ]}
                        selected={form.plan === "Premium"}
                        onClick={() => setForm({ ...form, plan: "Premium" })}
                    />

                    <PlanCard
                        name="Enterprise"
                        price="Custom"
                        features={[
                            "Unlimited outlets",
                            "Dedicated manager",
                            "Dedicated account manager",
                            "24/7 Phone support",
                            "Custom integrations",
                            "SLA guarantee",
                            "On-premise option",

                        ]}
                        selected={form.plan === "Enterprise"}
                        onClick={() => setForm({ ...form, plan: "Enterprise" })}
                    />
                </div>

                {/* BILLING TOGGLE */}
                <div className="mt-6 flex items-center gap-3">
                    <span className="text-sm text-gray-600">Billing Cycle:</span>

                    <button
                        type="button"
                        onClick={() => setForm({ ...form, billingCycle: "Monthly" })}
                        className={`px-4 py-1.5 rounded-lg text-sm ${form.billingCycle === "Monthly"
                            ? "bg-[#e94560] text-white"
                            : "bg-gray-100"
                            }`}
                    >
                        Monthly
                    </button>

                    {/* <button
                        type="button"
                        onClick={() => setForm({ ...form, billingCycle: "Annual" })}
                        className={`px-4 py-1.5 rounded-lg text-sm ${form.billingCycle === "Annual"
                            ? "bg-[#e94560] text-white"
                            : "bg-gray-100"
                            }`}
                    >
                        Annual
                    </button> */}

                    <button
                        type="button"
                        onClick={() => setForm({ ...form, billingCycle: "Yearly" })}
                        className={`px-4 py-1.5 rounded-lg text-sm ${form.billingCycle === "Yearly"
                            ? "bg-[#e94560] text-white"
                            : "bg-gray-100"
                            }`}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* 🔥 ACTION */}
            <div className="flex justify-end gap-3">
                <button
                    type="button"
                    className="px-4 py-2 border rounded-lg"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-5 py-2 bg-[#e94560] text-white rounded-lg"
                >
                    Create Tenant
                </button>
            </div>
        </form>
    );
};

export default CreateTenantForm;