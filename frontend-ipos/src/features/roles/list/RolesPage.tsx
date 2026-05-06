import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RolesLayout from "../components/RolesLayout";
import { getRoles, deleteRole } from "../services/roleService";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/components/ui/table";
import type { Role } from "../types/role.types";

export const RolesPage: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      setRoles(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch roles:", err);
      setError("Failed to load roles. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      await deleteRole(id);
      fetchRoles();
    }
  };

  return (
    <RolesLayout title="Roles Management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Roles</h1>
          <p className="text-gray-500 text-sm">Manage system and custom roles</p>
        </div>
        <Button onClick={() => navigate("/roles/create")} className="bg-primary text-white">
          Create Role
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
          <p>{error}</p>
          <Button onClick={fetchRoles} className="mt-4 bg-red-600 text-white">Retry</Button>
        </Card>
      ) : (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.display_name}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    {role.is_system ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">System</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Custom</span>
                    )}
                  </TableCell>
                  <TableCell>{role.created_on ? new Date(role.created_on).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/roles/edit/${role.id}`)}>
                      Edit
                    </Button>
                    {!role.is_system && (
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(role.id)}>
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {roles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No roles found. Create your first role.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </RolesLayout>
  );
};
