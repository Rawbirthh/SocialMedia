import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPermissions, createPermission, updatePermission, deletePermission } from './permissions.api';
import type { CreatePermissionData, UpdatePermissionData } from './permissions.api';

export const usePermissions = () => {
  const queryClient = useQueryClient();

  const { data: permissions = [], isLoading, error } = useQuery({
    queryKey: ['permissions'],
    queryFn: getPermissions,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreatePermissionData) => createPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePermissionData }) =>
      updatePermission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });

  return {
    permissions,
    loading: isLoading,
    error: error?.message ?? (createMutation.isError ? createMutation.error.message : null),
    addPermission: createMutation.mutateAsync,
    updatePermission: updateMutation.mutateAsync,
    deletePermission: deleteMutation.mutateAsync,
  };
};
