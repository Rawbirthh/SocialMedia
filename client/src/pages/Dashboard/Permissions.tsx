import { useState } from 'react';
import { usePermissions } from '../../features/permissions/usePermissions';
import PermissionForm from '../../features/permissions/PermissionForm';
import DataTable from '../../components/ui/data-table';
import type { DataTableColumn } from '../../components/ui/data-table';
import type { Permission } from '../../features/permissions/permissions.api';
import { formatDate } from '../../utils/formatDate';

export default function Permissions() {
  const { permissions, loading, addPermission, updatePermission, deletePermission } = usePermissions();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ name: string; description: string } | null>(null);

  const handleEdit = (permission: Permission) => {
    setEditingId(permission.id);
    setEditData({
      name: permission.name,
      description: permission.description ?? '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const columns: DataTableColumn<Permission>[] = [
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description', render: (p) => p.description ?? '-' },
    {
      key: 'createdAt',
      header: 'Date Created',
      render: (p) => formatDate(p.createdAt),
    },
    {
      key: 'updatedAt',
      header: 'Date Updated',
      render: (p) => formatDate(p.updatedAt),
    }
  ];

  return (
    <div className="flex gap-8">
      {/* Left: Form */}
      <div className="w-80 shrink-0">
        <h2 className="text-lg font-semibold text-white mb-4">
          {editingId ? 'Edit Permission' : 'New Permission'}
        </h2>
        <PermissionForm
          onSubmit={async (data) => {
            if (editingId) {
              await updatePermission({ id: editingId, data });
              setEditingId(null);
              setEditData(null);
            } else {
              await addPermission(data);
            }
          }}
          initialData={editData ?? undefined}
          submitLabel={editingId ? 'Save Changes' : 'Create Permission'}
        />
        {editingId && (
          <button
            onClick={handleCancelEdit}
            className="w-full text-center text-sm text-zinc-400 hover:text-white mt-2"
          >
            Cancel editing
          </button>
        )}
      </div>

      {/* Right: Table */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-white mb-4">Permissions</h2>
        <DataTable
          data={permissions}
          columns={columns}
          loading={loading}
          searchPlaceholder="Search permissions..."
          searchKeys={['name', 'description']}
          actions={(permission) => (
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleEdit(permission)}
                className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deletePermission(permission.id)}
                className="rounded-lg bg-red-900/30 px-3 py-1.5 text-xs text-red-400 hover:bg-red-900/50"
              >
                Delete
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
