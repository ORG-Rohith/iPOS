import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OutletCard from "../components/OutletCard";
import type { Outlet } from "../types/outlet.types";
import { outletService } from "../services/outlet.service";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";
import OutletsLayout from "../form/OutletsLayout";

export const OutletsPage: React.FC = () => {
    const navigate = useNavigate();
    const [outlets, setOutlets] = useState<Outlet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchOutlets();
    }, []);

    const fetchOutlets = async () => {
        try {
            setLoading(true);
            const data = await outletService.getAll();

            // Map backend fields to frontend interface if necessary
            const mappedData = data.map((item: any) => ({
                ...item,
                address: item.address || item.address_line1 || "No address provided",
                devicesCount: item.devicesCount || "0",
                todaySales: item.todaySales || "$0",
                staffCount: item.staffCount || "0",
                status: item.status || (item.is_active ? "Active" : "Inactive"),
                tablesCount: item.tablesCount || "0",
            }));

            setOutlets(mappedData);
            setError(null);
        } catch (err: any) {
            console.error("Failed to fetch outlets:", err);
            setError("Failed to load outlets. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <OutletsLayout title="Outlets">
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : error ? (
                <Card className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
                    <p>{error}</p>
                    <Button
                        onClick={fetchOutlets}
                        className="mt-4 px-4 py-2 bg-red-600 text-white h-auto rounded-lg text-sm font-bold hover:bg-red-700 transition-colors border-none"
                    >
                        Retry
                    </Button>
                </Card>
            ) : outlets.length === 0 ? (
                <Card className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center border-none">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🏪</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">No Outlets Found</h3>
                    <p className="text-sm text-gray-500 mb-6">You haven't added any outlets yet.</p>
                    <Button
                        onClick={() => navigate("/outlets/create")}
                        className="px-6 py-2 h-auto bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-pink-100 border-none"
                    >
                        Add Your First Outlet
                    </Button>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outlets.map((outlet) => (
                        <OutletCard key={outlet.uuid} outlet={outlet} />
                    ))}
                </div>
            )}
        </OutletsLayout>
    );
};
