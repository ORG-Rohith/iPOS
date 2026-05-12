import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../shared/components/ui/Breadcrumbs";
import EditBusinessOwnerForm from "./EditBusinessOwnerForm";
import BusinessOwnerLayout from "../list/businessOwnerLayout";
import { useEditBusinessOwner } from "./useEditBusinessOwner";

export const EditBusinessOwnerPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const {
        form,
        updateBusinessOwner,
        loading,
        fetching,
        error,
    } = useEditBusinessOwner(id);

    const breadcrumbItems = [
        {
            label: "Home",
            path: "/dashboard",
        },
        {
            label: "Business Owners",
            path: "/businessOwners",
        },
        {
            label: "Edit Business Owner",
        },
    ];

    return (
        <BusinessOwnerLayout title="Edit Business Owner">
            <div className="max-w-7xl mx-auto">
                <Breadcrumbs items={breadcrumbItems} />

                {error && (
                    <div className="mx-7 mt-4 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
                        <span className="text-xl">⚠️</span>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <div className="p-7">
                    {fetching ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        </div>
                    ) : (
                        <div
                            className={
                                loading
                                    ? "opacity-50 pointer-events-none transition-opacity"
                                    : ""
                            }
                        >
                            <EditBusinessOwnerForm
                                initialData={form}
                                onSubmit={updateBusinessOwner}
                                loading={loading}
                            />
                        </div>
                    )}

                    {loading && (
                        <div className="fixed inset-0 bg-white/50 flex items-center justify-center z-50">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                        </div>
                    )}
                </div>
            </div>
        </BusinessOwnerLayout>
    );
};
