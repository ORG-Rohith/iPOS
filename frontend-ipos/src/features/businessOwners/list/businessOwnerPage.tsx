import React from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../dashboard/components/StatCard";
import BusinessOwnerLayout from "./businessOwnerLayout";
import { useBusinessOwners } from "./useBusinessOwner";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";
import { Input } from "../../../shared/components/ui/Input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/components/ui/table";
import { businessOwnerService } from "../services/businessOwnerService";

export const BusinessOwnersPage: React.FC = () => {
    const navigate = useNavigate();
    const { 
        stats, 
        businessOwners, 
        loading, 
        error, 
        page, 
        setPage, 
        limit, 
        search, 
        setSearch, 
        status, 
        setStatus, 
        total,
        refetch 
    } = useBusinessOwners();

    const totalPages = Math.ceil(total / limit);

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this business owner?")) {
            await businessOwnerService.updateBusinessOwner(id.toString(), { is_deleted: true } as any);
            refetch();
        }
    };

    if (loading && businessOwners.length === 0) {
        return (
            <BusinessOwnerLayout title="Business Owners">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                </div>
            </BusinessOwnerLayout>
        );
    }

    return (
        <BusinessOwnerLayout title="Business Owners">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Business Owners</h1>
                    <p className="text-gray-500 text-sm">Manage business owners and their subscriptions</p>
                </div>
                <Button onClick={() => navigate("/business-owners/create")} className="bg-primary text-white">
                    Create Business Owner
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6">
                    <p className="font-medium text-sm">{error}</p>
                </div>
            )}

            {/* 🔥 Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                {stats?.BusinessOwnersStats.map((stat: any, i) => (
                    <StatCard key={i} stat={stat} />
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <Input 
                        type="text" 
                        placeholder="Search by name or email..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white"
                    />
                </div>
                <div className="w-full sm:w-48">
                    <select 
                        className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm outline-none focus:border-primary"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                    </select>
                </div>
            </div>

            {/* 🔥 Data Table */}
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Subscriptions</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && businessOwners.length > 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                    </TableCell>
                                </TableRow>
                            ) : businessOwners.map((owner) => (
                                <TableRow key={owner.id}>
                                    <TableCell className="font-medium text-gray-900">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-sm">
                                                {owner.name.charAt(0).toUpperCase()}
                                            </div>
                                            {owner.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600">{owner.email || 'N/A'}</TableCell>
                                    <TableCell>
                                        <span className="capitalize text-gray-700">{owner.business_type}</span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-max ${
                                            owner.status === 'Active' ? 'bg-green-100 text-green-700' : 
                                            owner.status === 'Suspended' ? 'bg-red-100 text-red-700' : 
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                owner.status === 'Active' ? 'bg-green-500' : 
                                                owner.status === 'Suspended' ? 'bg-red-500' : 
                                                'bg-gray-500'
                                            }`}></span>
                                            {owner.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {owner.subscriptions && owner.subscriptions.length > 0 ? (
                                            <span className="text-sm text-gray-600">
                                                {owner.subscriptions.reduce((acc, sub) => acc + sub.quantity, 0)} Active
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">None</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50" onClick={() => navigate(`/business-owners/manage/${owner.id}`)}>
                                            View
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => navigate(`/business-owners/edit/${owner.id}`)}>
                                            Edit
                                        </Button>
                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(owner.id)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!loading && businessOwners.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                        No Business Owners found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                
                {/* Pagination */}
                {!loading && totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                        <span className="text-sm text-gray-500">
                            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} entries
                        </span>
                        <div className="flex gap-2">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </BusinessOwnerLayout>
    );
};