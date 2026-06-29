import { useState } from 'react';
import { useRoles } from '../../features/roles/useRoles';
import { usePermissions } from '../../features/permissions/usePermissions';
import RoleForm from '../../features/roles/RoleForm';
import DataTable from '../../components/ui/data-table';
import type { DataTableColumn } from '../../components/ui/data-table';
import type { Role } from '../../features/roles/roles.api';
import { formatDate } from '../../utils/formatDate';

export default function Roles() {
  const { roles, loading: rolesLoading, addRole, updateRole, deleteRole } = useRoles();
  const { permissions } = usePermissions();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{
    name: string;
    description: string;
    permissionIds: number[];
  } | null>(null);

  const handleEdit = (role: Role) => {
    setEditingId(role.id);
    setEditData({
      name: role.name,
      description: role.description ?? '',
      permissionIds: role.permissions.map((rp) => rp.permissionId),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const columns: DataTableColumn<Role>[] = [
    { key: 'name', header: 'Name' },
    { key: 'description', header: 'Description', render: (r) => r.description ?? '-' },
    {
      key: 'permissions',
      header: 'Permissions',
      render: (r) =>
        r.permissions.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {r.permissions.map((rp) => (
              <span
                key={rp.permissionId}
                className="rounded bg-blue-600/20 px-2 py-0.5 text-xs text-blue-400"
              >
                {rp.permission.name}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-zinc-500">-</span>
        ),
    },
    { key: 'createdAt', header: 'Date Created', render: (r) => formatDate(r.createdAt) },
    { key: 'updatedAt', header: 'Date Updated', render: (r) => formatDate(r.updatedAt) },
  ];

  return (
    <div className="flex gap-8">
      {/* Left: Form */}
      <div className="w-80 shrink-0">
        <h2 className="text-lg font-semibold text-white mb-4">
          {editingId ? 'Edit Role' : 'New Role'}
        </h2>
        <RoleForm
          onSubmit={async (data) => {
            if (editingId) {
              await updateRole({ id: editingId, data });
              setEditingId(null);
              setEditData(null);
            } else {
              await addRole(data);
            }
          }}
          permissions={permissions}
          initialData={editData ?? undefined}
          submitLabel={editingId ? 'Save Changes' : 'Create Role'}
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
        <h2 className="text-lg font-semibold text-white mb-4">Roles</h2>
        <DataTable
          data={roles}
          columns={columns}
          loading={rolesLoading}
          searchPlaceholder="Search roles..."
          searchKeys={['name', 'description']}
          actions={(role) => (
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleEdit(role)}
                className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteRole(role.id)}
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
