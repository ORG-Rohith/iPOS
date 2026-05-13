import React, { useEffect, useState } from "react";
import FormInput from "../../../shared/components/ui/FormInput";
import { Card } from "../../../shared/components/ui/card";
import { Button } from "../../../shared/components/ui/Button";
import type {
    CreateBusinessOwnerPayload,
    Plan,
    SubscriptionPayload,
} from "../types/businessOwers.types";
import { businessOwnerService } from "../services/businessOwnerService";

interface Props {
    form: CreateBusinessOwnerPayload;
    setForm: React.Dispatch<
        React.SetStateAction<CreateBusinessOwnerPayload>
    >;
}

const SubscriptionSection: React.FC<Props> = ({
    form,
    setForm,
}) => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);

    // Fetch plans from API on mount
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await businessOwnerService.getPlans();
                setPlans(data);
            } catch (err) {
                console.error("Failed to fetch plans:", err);
            } finally {
                setLoadingPlans(false);
            }
        };
        fetchPlans();
    }, []);

    // Check if a plan is enterprise/custom
    const isPlanCustom = (planId: number): boolean => {
        const plan = plans.find((p) => p.id === planId);
        return plan?.is_custom ?? false;
    };

    // Get plan info for display
    const getPlanInfo = (planId: number): Plan | undefined => {
        return plans.find((p) => p.id === planId);
    };

    // ADD subscription
    const handleAddSubscription = () => {
        const defaultPlanId = plans.length > 0 ? plans[0].id : 1;
        setForm((prev) => ({
            ...prev,
            subscriptions: [
                ...(prev.subscriptions ?? []),
                {
                    plan_id: defaultPlanId,
                    quantity: 1,
                    status: "active",
                    auto_renew: true,
                } as SubscriptionPayload,
            ],
        }));
    };

    // REMOVE subscription
    const handleRemoveSubscription = (index: number) => {
        setForm((prev) => {
            const updated = [...(prev.subscriptions ?? [])];
            updated.splice(index, 1);

            return {
                ...prev,
                subscriptions: updated,
            };
        });
    };

    // UPDATE subscription field
    const handleSubscriptionChange = <
        K extends keyof SubscriptionPayload
    >(
        index: number,
        field: K,
        value: string | number | boolean
    ) => {
        setForm((prev) => {
            const updated = [...(prev.subscriptions ?? [])];

            const numericFields: (keyof SubscriptionPayload)[] = [
                "plan_id",
                "quantity",
                "custom_max_tenants",
                "custom_max_outlets",
                "custom_max_users",
                "custom_max_devices",
            ];

            updated[index] = {
                ...updated[index],
                [field]: numericFields.includes(field)
                    ? Number(value)
                    : value,
            };

            return {
                ...prev,
                subscriptions: updated,
            };
        });
    };

    if (loadingPlans) {
        return (
            <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    <span className="ml-2 text-sm text-gray-500">Loading plans...</span>
                </div>
            </Card>
        );
    }

    return (
        <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-app-text">
                        Subscriptions
                    </h2>
                    <p className="text-sm text-gray-400">
                        Manage subscription plans and enterprise overrides
                    </p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddSubscription}
                >
                    + Add Subscription
                </Button>
            </div>

            {/* Body */}
            <div className="space-y-4">
                {(form.subscriptions ?? []).length === 0 && (
                    <div className="border border-dashed border-gray-200 rounded-lg py-6 text-center text-sm text-gray-500">
                        No subscriptions added
                    </div>
                )}

                {(form.subscriptions ?? []).map((sub, index) => {
                    const isCustom = isPlanCustom(sub.plan_id);
                    const planInfo = getPlanInfo(sub.plan_id);

                    return (
                        <div
                            key={index}
                            className="bg-gray-50 border border-gray-100 p-4 rounded-lg space-y-4"
                        >
                            {/* Row 1: Plan + Quantity + Status */}
                            <div className="flex gap-4 items-end">
                                {/* Plan */}
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Plan
                                    </label>

                                    <select
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm"
                                        value={sub.plan_id}
                                        onChange={(e) =>
                                            handleSubscriptionChange(
                                                index,
                                                "plan_id",
                                                e.target.value
                                            )
                                        }
                                    >
                                        {plans.map((plan) => (
                                            <option
                                                key={plan.id}
                                                value={plan.id}
                                            >
                                                {plan.name} — ${plan.price}/mo
                                                {plan.is_custom ? " (Custom)" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Quantity */}
                                <div className="w-28">
                                    <FormInput
                                        id={`quantity-${index}`}
                                        name={`quantity-${index}`}
                                        label="Quantity"
                                        type="number"
                                        min="1"
                                        value={sub.quantity}
                                        onChange={(e) =>
                                            handleSubscriptionChange(
                                                index,
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* Status */}
                                <div className="w-36">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">
                                        Status
                                    </label>
                                    <select
                                        className="w-full border border-gray-200 rounded-lg p-2.5 text-sm"
                                        value={sub.status || "active"}
                                        onChange={(e) =>
                                            handleSubscriptionChange(
                                                index,
                                                "status",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="trial">Trial</option>
                                        <option value="expired">Expired</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Remove */}
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="text-red-500"
                                    onClick={() =>
                                        handleRemoveSubscription(index)
                                    }
                                >
                                    Remove
                                </Button>
                            </div>

                            {/* Row 2: Plan limits info (read-only) */}
                            {planInfo && !isCustom && (
                                <div className="flex gap-4 text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
                                    <span>📊 Plan Limits:</span>
                                    <span>Tenants: {planInfo.max_tenants ?? "∞"}</span>
                                    <span>Outlets: {planInfo.max_outlets ?? "∞"}</span>
                                    <span>Users: {planInfo.max_users ?? "∞"}</span>
                                    <span>Devices: {planInfo.max_devices ?? "∞"}</span>
                                </div>
                            )}

                            {/* Row 3: Enterprise custom overrides */}
                            {isCustom && (
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                            Enterprise
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            Custom resource limits for this subscription
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        <FormInput
                                            id={`custom_max_tenants-${index}`}
                                            name={`custom_max_tenants-${index}`}
                                            label="Max Tenants"
                                            type="number"
                                            min="0"
                                            value={sub.custom_max_tenants ?? ""}
                                            onChange={(e) =>
                                                handleSubscriptionChange(
                                                    index,
                                                    "custom_max_tenants",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormInput
                                            id={`custom_max_outlets-${index}`}
                                            name={`custom_max_outlets-${index}`}
                                            label="Max Outlets"
                                            type="number"
                                            min="0"
                                            value={sub.custom_max_outlets ?? ""}
                                            onChange={(e) =>
                                                handleSubscriptionChange(
                                                    index,
                                                    "custom_max_outlets",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormInput
                                            id={`custom_max_users-${index}`}
                                            name={`custom_max_users-${index}`}
                                            label="Max Users"
                                            type="number"
                                            min="0"
                                            value={sub.custom_max_users ?? ""}
                                            onChange={(e) =>
                                                handleSubscriptionChange(
                                                    index,
                                                    "custom_max_users",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <FormInput
                                            id={`custom_max_devices-${index}`}
                                            name={`custom_max_devices-${index}`}
                                            label="Max Devices"
                                            type="number"
                                            min="0"
                                            value={sub.custom_max_devices ?? ""}
                                            onChange={(e) =>
                                                handleSubscriptionChange(
                                                    index,
                                                    "custom_max_devices",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Row 4: Dates */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-gray-200 pt-3">
                                <FormInput
                                    id={`start_date-${index}`}
                                    name={`start_date-${index}`}
                                    label="Start Date"
                                    type="date"
                                    value={sub.start_date ? sub.start_date.split("T")[0] : ""}
                                    onChange={(e) =>
                                        handleSubscriptionChange(
                                            index,
                                            "start_date",
                                            e.target.value
                                        )
                                    }
                                />
                                <FormInput
                                    id={`end_date-${index}`}
                                    name={`end_date-${index}`}
                                    label="End Date"
                                    type="date"
                                    value={sub.end_date ? sub.end_date.split("T")[0] : ""}
                                    onChange={(e) =>
                                        handleSubscriptionChange(
                                            index,
                                            "end_date",
                                            e.target.value
                                        )
                                    }
                                />
                                <div className="flex items-end pb-1">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={sub.auto_renew ?? true}
                                            onChange={(e) =>
                                                handleSubscriptionChange(
                                                    index,
                                                    "auto_renew",
                                                    e.target.checked
                                                )
                                            }
                                            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm text-gray-600">Auto Renew</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default SubscriptionSection;