import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoles, createRole, updateRole, deleteRole } from './roles.api';
import type { CreateRoleData, UpdateRoleData } from './roles.api';

export const useRoles = () => {
  const queryClient = useQueryClient();

  const { data: roles = [], isLoading, error } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateRoleData) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateRoleData }) =>
      updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });

  return {
    roles,
    loading: isLoading,
    error: error?.message ?? (createMutation.isError ? createMutation.error.message : null),
    addRole: createMutation.mutateAsync,
    updateRole: updateMutation.mutateAsync,
    deleteRole: deleteMutation.mutateAsync,
  };
};
