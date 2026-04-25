import { useEffect, useState } from "react";
import type { Outlet } from "../features/auth/types/outlet.types";
import { outletService } from "../features/outlets/services/outlet.service";


export const useOutletDetails = (uuid?: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [outlet, setOutlet] = useState<Outlet | null>(null);

    useEffect(() => {
        if (!uuid) return;

        const loadOutlet = async () => {
            try {
                setLoading(true);
                const data = await outletService.getById(uuid);
                setOutlet(data);
            } catch (err: any) {
                setError(err || "Failed to load outlet details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadOutlet();
    }, [uuid]);

    return { loading, error, outlet };

}