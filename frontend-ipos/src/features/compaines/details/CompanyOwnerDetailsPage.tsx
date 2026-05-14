import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BusinessOwnerLayout from "../list/CompanyOwnerLayout";
import { businessOwnerService } from "../services/CompanyOwnerService";

import type { BusinessOwner } from "../types/CompanyOwers.types";

import { Card } from "../../../shared/components/ui/card";
import { Button } from "../../../shared/components/ui/Button";

export const BusinessOwnerDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [owner, setOwner] = useState<BusinessOwner | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // =====================================================
    // FETCH DETAILS
    // =====================================================
    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);

                const data =
                    await businessOwnerService.getBusinessOwnerById(
                        id
                    );

                setOwner(data);
            } catch (err: any) {
                setError(
                    err.message || "Failed to load details"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    // =====================================================
    // LOADING
    // =====================================================
    if (loading) {
        return (
            <BusinessOwnerLayout title="Business Owner Details">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </BusinessOwnerLayout>
        );
    }

    // =====================================================
    // ERROR
    // =====================================================
    if (error || !owner) {
        return (
            <BusinessOwnerLayout title="Business Owner Details">
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 mb-6">
                    <p className="font-medium">
                        {error ||
                            "Business owner not found."}
                    </p>
                </div>
            </BusinessOwnerLayout>
        );
    }

    return (
        <BusinessOwnerLayout title="Business Owner Details">
            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {owner.name}
                    </h1>

                    <p className="text-gray-500 text-sm">
                        View and manage all details for
                        this company owner.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate("/businessOwners")
                        }
                    >
                        Back to List
                    </Button>

                    <Button
                        className="bg-primary text-white"
                        onClick={() =>
                            navigate(
                                `/business-owners/edit/${owner.id}`
                            )
                        }
                    >
                        Edit Company Owner
                    </Button>
                </div>
            </div>

            {/* ===================================================== */}
            {/* MAIN GRID */}
            {/* ===================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ===================================================== */}
                {/* LEFT SECTION */}
                {/* ===================================================== */}
                <div className="lg:col-span-2 space-y-6">
                    {/* ===================================================== */}
                    {/* COMPANY INFO */}
                    {/* ===================================================== */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">
                            Company Information
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Legal Name
                                </p>

                                <p className="font-medium text-gray-800">
                                    {owner.legal_name ||
                                        "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Business Type
                                </p>

                                <p className="font-medium text-gray-800 capitalize">
                                    {owner.business_type ||
                                        "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Tax ID
                                </p>

                                <p className="font-medium text-gray-800">
                                    {owner.tax_id || "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Registration Number
                                </p>

                                <p className="font-medium text-gray-800">
                                    {owner.registration_number ||
                                        "N/A"}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* ===================================================== */}
                    {/* LOCATION */}
                    {/* ===================================================== */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">
                            Location & Settings
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <p className="text-sm text-gray-500 mb-1">
                                    Address
                                </p>

                                <p className="font-medium text-gray-800">
                                    {owner.address ? (
                                        <>
                                            {owner.address}
                                            <br />

                                            {owner.city},{" "}
                                            {owner.state}{" "}
                                            {
                                                owner.postal_code
                                            }
                                            <br />

                                            {owner.country}
                                        </>
                                    ) : (
                                        "No address provided"
                                    )}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Currency
                                    </p>

                                    <p className="font-medium text-gray-800">
                                        {owner.currency ||
                                            "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Timezone
                                    </p>

                                    <p className="font-medium text-gray-800">
                                        {owner.timezone ||
                                            "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* ===================================================== */}
                    {/* LICENSES */}
                    {/* ===================================================== */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-lg font-semibold text-app-text">
                                Licenses
                            </h2>

                            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {owner.subscriptions
                                    ?.length || 0}{" "}
                                License
                                {(owner.subscriptions
                                    ?.length || 0) !== 1
                                    ? "s"
                                    : ""}
                            </span>
                        </div>

                        <div className="space-y-4">
                            {owner.subscriptions &&
                                owner.subscriptions.length >
                                0 ? (
                                owner.subscriptions.map(
                                    (sub, idx) => {
                                        const isEnterprise =
                                            sub.plan
                                                ?.is_custom;

                                        // Effective limits
                                        const effectiveTenants =
                                            sub.custom_max_tenants ??
                                            sub.plan
                                                ?.max_tenants ??
                                            null;

                                        const effectiveOutlets =
                                            sub.custom_max_outlets ??
                                            sub.plan
                                                ?.max_outlets ??
                                            null;

                                        const effectiveUsers =
                                            sub.custom_max_users ??
                                            sub.plan
                                                ?.max_users ??
                                            null;

                                        const effectiveDevices =
                                            sub.custom_max_devices ??
                                            sub.plan
                                                ?.max_devices ??
                                            null;

                                        return (
                                            <div
                                                key={idx}
                                                className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4"
                                            >
                                                {/* ================================= */}
                                                {/* HEADER */}
                                                {/* ================================= */}
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="font-semibold text-gray-800 text-base">
                                                                {sub
                                                                    .plan
                                                                    ?.name ||
                                                                    `Plan #${sub.plan_id}`}
                                                            </h3>

                                                            {isEnterprise && (
                                                                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                                                    Enterprise
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                            <span>
                                                                Qty:{" "}
                                                                <strong>
                                                                    {
                                                                        sub.quantity
                                                                    }
                                                                </strong>
                                                            </span>

                                                            {sub.start_date && (
                                                                <span>
                                                                    Start:{" "}
                                                                    <strong>
                                                                        {new Date(
                                                                            sub.start_date
                                                                        ).toLocaleDateString()}
                                                                    </strong>
                                                                </span>
                                                            )}

                                                            {sub.end_date && (
                                                                <span>
                                                                    End:{" "}
                                                                    <strong>
                                                                        {new Date(
                                                                            sub.end_date
                                                                        ).toLocaleDateString()}
                                                                    </strong>
                                                                </span>
                                                            )}

                                                            <span>
                                                                Auto
                                                                Renew:{" "}
                                                                <strong>
                                                                    {sub.auto_renew
                                                                        ? "✅ Yes"
                                                                        : "❌ No"}
                                                                </strong>
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* STATUS */}
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${sub.status ===
                                                            "active"
                                                            ? "bg-green-100 text-green-700"
                                                            : sub.status ===
                                                                "trial"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : sub.status ===
                                                                    "expired"
                                                                    ? "bg-gray-100 text-gray-700"
                                                                    : "bg-red-100 text-red-700"
                                                            }`}
                                                    >
                                                        {sub.status
                                                            ?.charAt(
                                                                0
                                                            )
                                                            .toUpperCase() +
                                                            sub.status?.slice(
                                                                1
                                                            )}
                                                    </span>
                                                </div>

                                                {/* ================================= */}
                                                {/* LIMITS */}
                                                {/* ================================= */}
                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <span
                                                            className={`text-xs font-semibold px-2 py-1 rounded-full ${isEnterprise
                                                                ? "bg-purple-100 text-purple-700"
                                                                : "bg-blue-100 text-blue-700"
                                                                }`}
                                                        >
                                                            {isEnterprise
                                                                ? "Custom Editable Limits"
                                                                : "Plan Default Limits"}
                                                        </span>

                                                        <span className="text-xs text-gray-500">
                                                            {isEnterprise
                                                                ? "Enterprise plan with custom resource allocation"
                                                                : "Read-only limits inherited from selected plan"}
                                                        </span>
                                                    </div>

                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                        {/* TENANTS */}
                                                        <div className="bg-white rounded-xl border border-gray-100 p-4">
                                                            <p className="text-xs text-gray-500 mb-2">
                                                                Max
                                                                Tenants
                                                            </p>

                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {effectiveTenants ??
                                                                    "∞"}
                                                            </p>

                                                            {!isEnterprise && (
                                                                <p className="text-[11px] text-gray-400 mt-1">
                                                                    Plan
                                                                    Controlled
                                                                </p>
                                                            )}

                                                            {isEnterprise && (
                                                                <p className="text-[11px] text-purple-600 mt-1">
                                                                    Custom
                                                                    Editable
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* OUTLETS */}
                                                        <div className="bg-white rounded-xl border border-gray-100 p-4">
                                                            <p className="text-xs text-gray-500 mb-2">
                                                                Max
                                                                Outlets
                                                            </p>

                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {effectiveOutlets ??
                                                                    "∞"}
                                                            </p>

                                                            {!isEnterprise && (
                                                                <p className="text-[11px] text-gray-400 mt-1">
                                                                    Plan
                                                                    Controlled
                                                                </p>
                                                            )}

                                                            {isEnterprise && (
                                                                <p className="text-[11px] text-purple-600 mt-1">
                                                                    Custom
                                                                    Editable
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* USERS */}
                                                        <div className="bg-white rounded-xl border border-gray-100 p-4">
                                                            <p className="text-xs text-gray-500 mb-2">
                                                                Max
                                                                Users
                                                            </p>

                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {effectiveUsers ??
                                                                    "∞"}
                                                            </p>

                                                            {!isEnterprise && (
                                                                <p className="text-[11px] text-gray-400 mt-1">
                                                                    Plan
                                                                    Controlled
                                                                </p>
                                                            )}

                                                            {isEnterprise && (
                                                                <p className="text-[11px] text-purple-600 mt-1">
                                                                    Custom
                                                                    Editable
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* DEVICES */}
                                                        <div className="bg-white rounded-xl border border-gray-100 p-4">
                                                            <p className="text-xs text-gray-500 mb-2">
                                                                Max
                                                                Devices
                                                            </p>

                                                            <p className="text-2xl font-bold text-gray-800">
                                                                {effectiveDevices ??
                                                                    "∞"}
                                                            </p>

                                                            {!isEnterprise && (
                                                                <p className="text-[11px] text-gray-400 mt-1">
                                                                    Plan
                                                                    Controlled
                                                                </p>
                                                            )}

                                                            {isEnterprise && (
                                                                <p className="text-[11px] text-purple-600 mt-1">
                                                                    Custom
                                                                    Editable
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )
                            ) : (
                                <p className="text-gray-500 text-center py-4 border border-dashed rounded-lg">
                                    No Licenses found.
                                </p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* ===================================================== */}
                {/* RIGHT SECTION */}
                {/* ===================================================== */}
                <div className="space-y-6">
                    {/* STATUS */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">
                            Status
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Account Status
                                </p>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center w-max ${owner.status ===
                                        "Active"
                                        ? "bg-green-100 text-green-700"
                                        : owner.status ===
                                            "Suspended"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    <span
                                        className={`w-2 h-2 rounded-full mr-2 ${owner.status ===
                                            "Active"
                                            ? "bg-green-500"
                                            : owner.status ===
                                                "Suspended"
                                                ? "bg-red-500"
                                                : "bg-gray-500"
                                            }`}
                                    ></span>

                                    {owner.status}
                                </span>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Onboarding
                                </p>

                                {owner.onboarding_complete ? (
                                    <span className="text-green-600 text-sm font-medium">
                                        ✅ Complete
                                    </span>
                                ) : (
                                    <span className="text-orange-600 text-sm font-medium">
                                        ⏳ Pending
                                    </span>
                                )}
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Created On
                                </p>

                                <p className="font-medium text-gray-800 text-sm">
                                    {owner.created_on
                                        ? new Date(
                                            owner.created_on
                                        ).toLocaleDateString(
                                            undefined,
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )
                                        : "N/A"}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* CONTACT */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">
                            Contact Details
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Contact Name
                                </p>

                                <p className="font-medium text-gray-800">
                                    {owner.contact_name ||
                                        "N/A"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Email
                                </p>

                                <a
                                    href={`mailto:${owner.email}`}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {owner.email || "N/A"}
                                </a>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Phone
                                </p>

                                <a
                                    href={`tel:${owner.phone}`}
                                    className="font-medium text-blue-600 hover:underline"
                                >
                                    {owner.phone || "N/A"}
                                </a>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">
                                    Website
                                </p>

                                {owner.website ? (
                                    <a
                                        href={
                                            owner.website.startsWith(
                                                "http"
                                            )
                                                ? owner.website
                                                : `https://${owner.website}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        {owner.website}
                                    </a>
                                ) : (
                                    "N/A"
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* ===================================================== */}
                    {/* COMPANY OWNERS */}
                    {/* ===================================================== */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-lg font-semibold text-app-text">
                                Company Owners
                            </h2>

                            <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                                {(owner).owners?.length || 0} Owner
                                {((owner).owners?.length || 0) !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {(owner).owners && (owner).owners.length > 0 ? (
                                (owner).owners.map((contact: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-xl border space-y-2 ${contact.is_primary
                                                ? "bg-blue-50/60 border-blue-200"
                                                : "bg-gray-50 border-gray-100"
                                            }`}
                                    >
                                        {/* Name + Badge */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                    {contact.name?.charAt(0)?.toUpperCase() || "?"}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">
                                                        {contact.name}
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        {contact.role || "Owner"}
                                                    </p>
                                                </div>
                                            </div>

                                            {contact.is_primary && (
                                                <span className="text-[10px] font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                                                    Primary
                                                </span>
                                            )}
                                        </div>

                                        {/* Contact Info */}
                                        <div className="flex flex-col gap-1 pl-10">
                                            {contact.email && (
                                                <a
                                                    href={`mailto:${contact.email}`}
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    📧 {contact.email}
                                                </a>
                                            )}

                                            {contact.phone && (
                                                <a
                                                    href={`tel:${contact.phone}`}
                                                    className="text-xs text-blue-600 hover:underline"
                                                >
                                                    📞 {contact.phone}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4 border border-dashed rounded-lg text-sm">
                                    No owners added yet.
                                </p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
};