import { useState, useEffect } from "react";
import type { SidebarData } from "../../src/features/auth/types/dashboard";
import { fetchSidebarData } from "../services/dashboardService";

// 🔥 Global cache
let sidebarCache: SidebarData | null = null;

export const useSidebar = () => {
  const [data, setData] = useState<SidebarData | null>(sidebarCache);
  const [loading, setLoading] = useState(!sidebarCache); // only true if no cache
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSidebar = async () => {
      try {
        const sidebarData = await fetchSidebarData();

        // 🔥 Update cache
        sidebarCache = sidebarData;

        // ✅ Update UI only if component still mounted
        if (isMounted) {
          setData(sidebarData);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load sidebar data");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // ✅ Always call API (background refetch)
    loadSidebar();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};