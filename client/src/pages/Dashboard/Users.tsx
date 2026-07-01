import { useState } from 'react';
import { useUsers } from '../../features/users/useUsers';
import { useRoles } from '../../features/roles/useRoles';
import UserForm from '../../features/users/UserForm';
import DataTable from '../../components/ui/data-table';
import type { DataTableColumn } from '../../components/ui/data-table';
import type { User } from '../../features/users/users.api';
import { formatDate } from '../../utils/formatDate';

export default function Users() {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();
  const { roles } = useRoles();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ name: string; email: string; roleIds?: number[] } | null>(null);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditData({
      name: user.name,
      email: user.email,
      roleIds: user.roles.map((ur) => ur.roleId),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const columns: DataTableColumn<User>[] = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'roles',
      header: 'Roles',
      render: (u) => (
        <div className="flex flex-wrap gap-1">
          {u.roles.length > 0 ? (
            u.roles.map((ur) => (
              <span key={ur.id} className="rounded bg-blue-600/20 px-1.5 py-0.5 text-xs text-blue-400">
                {ur.role.name}
              </span>
            ))
          ) : (
            <span className="text-xs text-zinc-500">No roles</span>
          )}
        </div>
      ),
    },
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
          {editingId ? 'Edit User' : 'New User'}
        </h2>
        <UserForm
          onSubmit={(data) => {
            if (editingId) {
              return updateUser({ id: editingId, data }).then((result) => {
                setEditingId(null);
                setEditData(null);
                return result;
              });
            }
            return addUser(data);
          }}
          roles={roles}
          initialData={editData ?? undefined}
          submitLabel={editingId ? 'Save Changes' : 'Create Account'}
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
        <h2 className="text-lg font-semibold text-white mb-4">Users</h2>
        <DataTable
          data={users}
          columns={columns}
          loading={loading}
          searchPlaceholder="Search users..."
          searchKeys={['name', 'email']}
          actions={(user) => (
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => handleEdit(user)}
                className="rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
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
