import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsersLayout from "../components/UsersLayout";
import { getUsers, deleteUser } from "../services/userService";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/components/ui/table";
import type { User } from "../types/user.types";

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <UsersLayout title="Users Management">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Users</h1>
          <p className="text-gray-500 text-sm">Manage users and their role assignments</p>
        </div>
        <Button onClick={() => navigate("/users/create")} className="bg-primary text-white">
          Create User
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="bg-red-50 text-red-600 p-6 rounded-xl border border-red-100 text-center">
          <p>{error}</p>
          <Button onClick={fetchUsers} className="mt-4 bg-red-600 text-white">Retry</Button>
        </Card>
      ) : (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell>
                    {user.role ? (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {user.role.display_name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">No Role Assigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {user.is_active ? (
                      <span className="text-green-600 text-sm font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Active
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm font-medium flex items-center">
                        <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span> Inactive
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {user.created_on ? new Date(user.created_on).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/users/edit/${user.id}`)}>
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No users found. Create your first user.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </UsersLayout>
  );
};
