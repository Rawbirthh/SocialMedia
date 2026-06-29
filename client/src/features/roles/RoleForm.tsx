import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import type { CreateRoleData } from './roles.api';
import type { Permission } from '../permissions/permissions.api';

interface RoleFormProps {
  onSubmit: (data: CreateRoleData) => Promise<unknown>;
  permissions: Permission[];
  initialData?: {
    name: string;
    description: string;
    permissionIds: number[];
  };
  submitLabel?: string;
}

export default function RoleForm({ onSubmit, permissions, initialData, submitLabel = 'Create Role' }: RoleFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<number[]>(initialData?.permissionIds ?? []);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const togglePermission = (id: number) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      await onSubmit({ name, description: description || undefined, permissionIds: selectedPermissionIds });
      if (!initialData) {
        setName('');
        setDescription('');
        setSelectedPermissionIds([]);
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: Record<string, string[]> } } };
      if (axiosErr.response?.data?.error) {
        setErrors(axiosErr.response.data.error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mb-6">
      <div className="space-y-2">
        <Label htmlFor="role-name" className="text-zinc-300">
          Role Name
        </Label>
        <Input
          id="role-name"
          type="text"
          placeholder="e.g. Admin"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="role-description" className="text-zinc-300">
          Description (optional)
        </Label>
        <Input
          id="role-description"
          type="text"
          placeholder="Brief description of this role"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        />
      </div>

      {permissions.length > 0 && (
        <div className="space-y-2">
          <Label className="text-zinc-300">Permissions</Label>
          <div className="flex flex-wrap gap-2">
            {permissions.map((perm) => (
              <button
                key={perm.id}
                type="button"
                onClick={() => togglePermission(perm.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  selectedPermissionIds.includes(perm.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
              >
                {perm.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-white text-zinc-900 hover:bg-zinc-200"
      >
        {submitting ? 'Saving...' : submitLabel}
      </Button>
    </form>
  );
}
