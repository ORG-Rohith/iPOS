import React from "react";
import FormInput from "../../../shared/components/ui/FormInput";
import { Card } from "../../../shared/components/ui/card";
import { Button } from "../../../shared/components/ui/Button";
import type {
    CreateBusinessOwnerPayload,
    SubscriptionPayload,
} from "../types/businessOwers.types";

interface Props {
    form: CreateBusinessOwnerPayload;
    setForm: React.Dispatch<
        React.SetStateAction<CreateBusinessOwnerPayload>
    >;
}

const PLAN_OPTIONS = [
    { id: 1, name: "Standard" },
    { id: 2, name: "Plus" },
    { id: 3, name: "Enterprise" },
];

const SubscriptionSection: React.FC<Props> = ({
    form,
    setForm,
}) => {
    // ADD subscription
    const handleAddSubscription = () => {
        setForm((prev) => ({
            ...prev,
            subscriptions: [
                ...(prev.subscriptions ?? []),
                {
                    plan_id: 1,
                    quantity: 1,
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

    // UPDATE subscription
    const handleSubscriptionChange = <
        K extends keyof SubscriptionPayload
    >(
        index: number,
        field: K,
        value: string | number
    ) => {
        setForm((prev) => {
            const updated = [...(prev.subscriptions ?? [])];

            updated[index] = {
                ...updated[index],
                [field]:
                    field === "plan_id" || field === "quantity"
                        ? Number(value)
                        : value,
            };

            return {
                ...prev,
                subscriptions: updated,
            };
        });
    };

    return (
        <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-app-text">
                        Subscriptions
                    </h2>
                    <p className="text-sm text-gray-400">
                        Manage subscription plans
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

                {(form.subscriptions ?? []).map((sub, index) => (
                    <div
                        key={index}
                        className="flex gap-4 items-end bg-gray-50 border border-gray-100 p-4 rounded-lg"
                    >
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
                                {PLAN_OPTIONS.map((plan) => (
                                    <option
                                        key={plan.id}
                                        value={plan.id}
                                    >
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity */}
                        <div className="w-32">
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
                ))}
            </div>
        </Card>
    );
};

export default SubscriptionSection;