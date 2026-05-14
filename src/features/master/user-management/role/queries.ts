import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRole, getRole, getRoles, updateRole } from './api';

const QUERY_KEY = ['@master/role'];

export function useRolesQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getRoles,
  });
  return { data, isLoading };
}

export function useCreateRoleMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.UserManagement.RoleForm) =>
      await createRole(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<Master.UserManagement.RoleItem[]>(QUERY_KEY) ??
        [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useRoleQuery(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getRole(id);
      if (!data) return undefined;
      return {
        name: data.name,
      };
    },
  });
}

export function useUpdateRoleMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.UserManagement.RoleForm) =>
      await updateRole(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.UserManagement.RoleItem[]>(QUERY_KEY) ??
        [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const itemToReplace: Master.UserManagement.RoleItem = {
        id: id,
        name: formData.name,
      };

      queryClient.setQueryData(QUERY_KEY, [
        ...result.slice(0, index),
        itemToReplace,
        ...result.slice(index + 1),
      ]);
      queryClient.setQueryData([...QUERY_KEY, id], formData);
    },
  });
}
