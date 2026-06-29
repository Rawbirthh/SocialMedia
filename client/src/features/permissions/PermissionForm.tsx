import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import type { CreatePermissionData } from './permissions.api';

interface PermissionFormProps {
  onSubmit: (data: CreatePermissionData) => Promise<unknown>;
  initialData?: {
    name: string;
    description: string;
  };
  submitLabel?: string;
}

export default function PermissionForm({ onSubmit, initialData, submitLabel = 'Create Permission' }: PermissionFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    try {
      await onSubmit({ name, description: description || undefined });
      if (!initialData) {
        setName('');
        setDescription('');
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
        <Label htmlFor="permission-name" className="text-zinc-300">
          Permission Name
        </Label>
        <Input
          id="permission-name"
          type="text"
          placeholder="e.g. users.create"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name[0]}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="permission-description" className="text-zinc-300">
          Description (optional)
        </Label>
        <Input
          id="permission-description"
          type="text"
          placeholder="Brief description of this permission"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-transparent border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
        />
      </div>

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
