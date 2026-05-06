import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UsersLayout from "../components/UsersLayout";
import { getUserById, createUser, updateUser } from "../services/userService";
import { getRoles } from "../../roles/services/roleService";
import { outletService } from "../../outlets/services/outlet.service";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";
import FormSelect from "../../../shared/components/ui/FormSelect";
import type { Outlet } from "../../outlets/types/outlet.types";
import type { Role } from "../../roles/types/role.types";
import FormInput from "../../../shared/components/ui/FormInput";

export const UserFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    is_active: true,
    role_id: "",
    outlet_id: "",
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDependencies();
  }, [id]);

  const loadDependencies = async () => {
    try {
      setLoading(true);
      const [fetchedRoles, fetchedOutlets] = await Promise.all([
        getRoles(),
        outletService.getAll()
      ]);
      setRoles(fetchedRoles);
      setOutlets(fetchedOutlets);

      if (isEditing && id) {
        const user = await getUserById(id);
        if (user) {
          setFormData({
            name: user.name,
            email: user.email,
            password: "",
            is_active: user.is_active,
            role_id: user.role_id || "",
            outlet_id: user.outlet_id || "",
          });
        } else {
          setError("User not found");
        }
      }
    } catch (err) {
      setError("Failed to load user form dependencies.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // @ts-ignore - Handle checkbox explicitly
    const isChecked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? isChecked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const submitData: any = { 
        ...formData, 
        role_id: formData.role_id ? parseInt(formData.role_id as string, 10) : undefined,
        outlet_id: formData.outlet_id ? parseInt(formData.outlet_id as string, 10) : null 
      };
      
      if (isEditing && id) {
        // Exclude password if empty on edit
        const { password, ...rest } = submitData;
        await updateUser(id, { ...rest, password: password || undefined });
      } else {
        await createUser(submitData);
      }
      navigate("/users");
    } catch (err) {
      setError("Failed to save user");
      setSaving(false);
    }
  };

  return (
    <UsersLayout title={isEditing ? "Edit User" : "Create User"}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit User" : "Create New User"}
          </h1>
          <Button variant="outline" onClick={() => navigate("/users")}>
            Cancel
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error && !saving ? (
          <Card className="bg-red-50 text-red-600 p-6 text-center">{error}</Card>
        ) : (
          <Card className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  required
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormSelect
                  label="Role"
                  name="role_id"
                  id="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  options={roles.map(r => ({ label: r.display_name, value: r.id }))}
                  required
                />
                <FormSelect
                  label="Assigned Outlet (Optional)"
                  name="outlet_id"
                  id="outlet_id"
                  value={formData.outlet_id}
                  onChange={handleChange}
                  options={outlets.map(o => ({ label: o.name, value: o.id }))}
                />
              </div>

              {!isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter temporary password"
                    required={!isEditing}
                  />
                </div>
              )}

              {isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Reset Password (Optional)"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-gray-900">
                  User is Active (Can Login)
                </label>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                <Button type="submit" disabled={saving} className="bg-primary text-white px-8">
                  {saving ? "Saving..." : "Save User"}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </UsersLayout>
  );
};

export default UserFormPage;
