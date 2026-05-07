import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createUserRoleMapping,
  getUserRoleMapping,
  getUserRoleMappings,
  updateUserRoleMapping,
} from './api';

const QUERY_KEY = ['@master/UserRoleMapping'];

export function useUserRoleMappingsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getUserRoleMappings,
  });
  return { data, isLoading };
}

export function useCreateUserRoleMappingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.UserManagement.UserRoleMappingForm) =>
      await createUserRoleMapping(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<Master.UserManagement.UserRoleMappingItem[]>(
          QUERY_KEY
        ) ?? [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useUserRoleMappingQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getUserRoleMapping(id);
      if (!data) return undefined;
      return {
        UserId: data.UserId,
        RoleName: data.RoleName,
      };
    },
  });
}

export function useUpdateUserRoleMappingMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.UserManagement.UserRoleMappingForm) =>
      await updateUserRoleMapping(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.UserManagement.UserRoleMappingItem[]>(
          QUERY_KEY
        ) ?? [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const itemToReplace: Master.UserManagement.UserRoleMappingItem = {
        id: id,
        UserId: formData.UserId,
        RoleName: formData.RoleName,
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
