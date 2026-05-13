import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from 'services';

const URL = `userManagement/userRolesMappings`;
const QUERY_KEY = ['@master/user-management/user-role-mappings'];

export function useUserRoleMappingsQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } =
        await ApiService.get<{ userId: string; roleName: string }[]>(URL);
      return data || [];
    },
  });
}

export function useAddUserRoleMappingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Master.UserManagement.UserRoleMappingForm) => {
      const { error } = await ApiService.post(URL, payload);
      return !error;
    },
    onSuccess: success => {
      if (success) queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useRemoveUserRoleMappingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Master.UserManagement.UserRoleMappingForm) => {
      const { error } = await ApiService.del(URL, payload);
      return !error;
    },
    onSuccess: success => {
      if (success) queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
