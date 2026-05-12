import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BusinessOwnerLayout from "../list/businessOwnerLayout";
import { businessOwnerService } from "../services/businessOwnerService";
import type { BusinessOwner } from "../types/businessOwers.types";
import { Card } from "../../../shared/components/ui/card";
import { Button } from "../../../shared/components/ui/Button";

export const BusinessOwnerDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [owner, setOwner] = useState<BusinessOwner | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const data = await businessOwnerService.getBusinessOwnerById(id);
                setOwner(data);
            } catch (err: any) {
                setError(err.message || "Failed to load details");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <BusinessOwnerLayout title="Business Owner Details">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </BusinessOwnerLayout>
        );
    }

    if (error || !owner) {
        return (
            <BusinessOwnerLayout title="Business Owner Details">
                <div className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 mb-6">
                    <p className="font-medium">{error || "Business owner not found."}</p>
                </div>
            </BusinessOwnerLayout>
        );
    }

    return (
        <BusinessOwnerLayout title="Business Owner Details">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{owner.name}</h1>
                    <p className="text-gray-500 text-sm">View and manage all details for this business owner.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate("/businessOwners")}>
                        Back to List
                    </Button>
                    <Button className="bg-primary text-white" onClick={() => navigate(`/business-owners/edit/${owner.id}`)}>
                        Edit Business Owner
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">Business Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Legal Name</p>
                                <p className="font-medium text-gray-800">{owner.legal_name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Business Type</p>
                                <p className="font-medium text-gray-800 capitalize">{owner.business_type || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Tax ID</p>
                                <p className="font-medium text-gray-800">{owner.tax_id || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Registration Number</p>
                                <p className="font-medium text-gray-800">{owner.registration_number || "N/A"}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Location Info */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">Location & Settings</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                                <p className="text-sm text-gray-500 mb-1">Address</p>
                                <p className="font-medium text-gray-800">
                                    {owner.address ? (
                                        <>
                                            {owner.address}<br />
                                            {owner.city}, {owner.state} {owner.postal_code}<br />
                                            {owner.country}
                                        </>
                                    ) : "No address provided"}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Currency</p>
                                    <p className="font-medium text-gray-800">{owner.currency || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Timezone</p>
                                    <p className="font-medium text-gray-800">{owner.timezone || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Subscriptions */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-lg font-semibold text-app-text">Subscriptions</h2>
                            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {owner.subscriptions?.reduce((acc, sub) => acc + sub.quantity, 0) || 0} Total Plans
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                            {owner.subscriptions && owner.subscriptions.length > 0 ? (
                                owner.subscriptions.map((sub, idx) => (
                                    <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <div>
                                            <p className="font-semibold text-gray-800">{sub.plan?.name || `Plan #${sub.plan_id}`}</p>
                                            <p className="text-xs text-gray-500">Plan ID: {sub.plan_id}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 mb-1">Quantity</p>
                                            <p className="font-bold text-primary bg-pink-50 px-3 py-1 rounded-full">{sub.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4 border border-dashed rounded-lg">No subscriptions found.</p>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    {/* Status Card */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">Status</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Account Status</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center w-max ${
                                    owner.status === 'Active' ? 'bg-green-100 text-green-700' : 
                                    owner.status === 'Suspended' ? 'bg-red-100 text-red-700' : 
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full mr-2 ${
                                        owner.status === 'Active' ? 'bg-green-500' : 
                                        owner.status === 'Suspended' ? 'bg-red-500' : 
                                        'bg-gray-500'
                                    }`}></span>
                                    {owner.status}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Onboarding</p>
                                {owner.onboarding_complete ? (
                                    <span className="text-green-600 text-sm font-medium">✅ Complete</span>
                                ) : (
                                    <span className="text-orange-600 text-sm font-medium">⏳ Pending</span>
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Created On</p>
                                <p className="font-medium text-gray-800 text-sm">
                                    {owner.created_on ? new Date(owner.created_on).toLocaleDateString(undefined, {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    }) : "N/A"}
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Contact Card */}
                    <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-app-text mb-4 border-b pb-2">Contact Details</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Contact Name</p>
                                <p className="font-medium text-gray-800">{owner.contact_name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Email</p>
                                <a href={`mailto:${owner.email}`} className="font-medium text-blue-600 hover:underline">{owner.email || "N/A"}</a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Phone</p>
                                <a href={`tel:${owner.phone}`} className="font-medium text-blue-600 hover:underline">{owner.phone || "N/A"}</a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Website</p>
                                {owner.website ? (
                                    <a href={owner.website.startsWith('http') ? owner.website : `https://${owner.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                                        {owner.website}
                                    </a>
                                ) : "N/A"}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </BusinessOwnerLayout>
    );
};
