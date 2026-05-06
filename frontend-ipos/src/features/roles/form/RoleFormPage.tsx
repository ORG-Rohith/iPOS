import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RolesLayout from "../components/RolesLayout";
import { getRoleById, createRole, updateRole } from "../services/roleService";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/card";
import FormInput from "../../../shared/components/ui/FormInput";

export const RoleFormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    is_system: false,
  });

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      loadRole(id);
    }
  }, [id]);

  const loadRole = async (roleId: string) => {
    try {
      const role = await getRoleById(roleId);
      if (role) {
        setFormData({
          name: role.name,
          display_name: role.display_name,
          is_system: role.is_system,
        });
      } else {
        setError("Role not found");
      }
    } catch (err) {
      setError("Failed to load role details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (isEditing && id) {
        await updateRole(id, formData);
      } else {
        await createRole(formData);
      }
      navigate("/roles");
    } catch (err) {
      setError("Failed to save role");
      setSaving(false);
    }
  };

  return (
    <RolesLayout title={isEditing ? "Edit Role" : "Create Role"}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Role" : "Create New Role"}
          </h1>
          <Button variant="outline" onClick={() => navigate("/roles")}>
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
          <Card className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Display Name"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                placeholder="e.g. Store Manager"
                required
              />
              <FormInput
                label="Code Name (Internal)"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. STORE_MANAGER"
                required
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_system"
                  name="is_system"
                  checked={formData.is_system}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="is_system" className="text-sm font-medium text-gray-900">
                  Is System Role?
                </label>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={saving} className="bg-primary text-white">
                  {saving ? "Saving..." : "Save Role"}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </RolesLayout>
  );
};

export default RoleFormPage;
