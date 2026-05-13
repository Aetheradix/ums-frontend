import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiService } from 'services';

const URL = `userManagement/roleFeaturesMappings`;
const QUERY_KEY = ['@master/user-management/role-feature-mappings'];

export function useRoleFeatureMappingsQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { data } =
        await ApiService.get<
          { roleName: string; featureName: string; action: string }[]
        >(URL);
      return data || [];
    },
  });
}

export function useAddRoleFeatureMappingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: Master.UserManagement.RoleFeatureMappingForm
    ) => {
      const { error } = await ApiService.post(URL, payload);
      return !error;
    },
    onSuccess: success => {
      if (success) queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useRemoveRoleFeatureMappingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      payload: Master.UserManagement.RoleFeatureMappingForm
    ) => {
      const { error } = await ApiService.del(URL, payload);
      return !error;
    },
    onSuccess: success => {
      if (success) queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
