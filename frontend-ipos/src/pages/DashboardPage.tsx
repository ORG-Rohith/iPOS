export const SuperAdminDashboard = () => {
  const userRaw = localStorage.getItem("user");
  const user = userRaw ? JSON.parse(userRaw) : null;

  const roleNames: string[] = user?.roles?.map((r: any) => r.roleName) ?? [];
  const isSuperAdmin = roleNames.some(
    (r) =>
      r.toLowerCase().includes("support admin") ||
      r.toLowerCase().includes("super admin"),
  );

  if (!user) return <div>Please login.</div>;
  if (!isSuperAdmin) return <div>Access denied.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Super Admin Dashboard</h1>
      <p>Welcome, {user.name}</p>

      <div style={{ marginTop: 16 }}>
        <h3>Quick info</h3>
        <ul>
          <li>Email: {user.email}</li>
          <li>Tenant: {user.tenantName ?? "N/A"}</li>
          <li>Role(s): {roleNames.join(", ")}</li>
        </ul>
      </div>
    </div>
  );
};
