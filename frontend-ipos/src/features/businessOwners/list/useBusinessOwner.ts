import { useEffect, useState } from "react";
import type { BusinessOwner, BusinessOwnersStatsData } from "../types/businessOwers.types";
import { businessOwnerService, fetchBusinessOwnersStatsData } from "../services/businessOwnerService";

export const useBusinessOwners = () => {
    const [stats, setStats] = useState<BusinessOwnersStatsData | null>(null);
    const [businessOwners, setBusinessOwners] = useState<BusinessOwner[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [total, setTotal] = useState(0);

    const loadData = async () => {
        try {
            setLoading(true);
            const [statsData, response] = await Promise.all([
                fetchBusinessOwnersStatsData(),
                businessOwnerService.getAllBusinessOwners({ page, limit, search, status: status === "All" ? "" : status }),
            ]);
            setStats(statsData);
            setBusinessOwners(response.data);
            setTotal(response.total);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to load Business Owner data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [page, limit, search, status]);

    const refetch = () => {
        loadData();
    };

    return { 
        stats, 
        businessOwners, 
        loading, 
        error, 
        page, 
        setPage, 
        limit, 
        setLimit, 
        search, 
        setSearch, 
        status, 
        setStatus, 
        total,
        refetch
    };
};
