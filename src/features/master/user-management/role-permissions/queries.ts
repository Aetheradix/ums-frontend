import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createRolePermission,
  deleteRolePermission,
  getFeatures,
  getRights,
  getRolePermissionByPolicy,
  getRolePermissions,
} from './api';

const queryKey = ['@user-management/role-permissions'];
const featuresKey = ['@user-management/features'];
const rightsKey = ['@user-management/rights'];

export function useFeaturesQuery() {
  return useQuery({
    queryKey: featuresKey,
    queryFn: getFeatures,
  });
}

export function useRightsQuery() {
  return useQuery({
    queryKey: rightsKey,
    queryFn: getRights,
  });
}

export function useRolePermissionsQuery() {
  return useQuery({
    queryKey: queryKey,
    queryFn: getRolePermissions,
  });
}

export function useRolePermissionByPolicyQuery(
  roleName: string,
  domain: string,
  feature: string,
  action: string
) {
  return useQuery({
    queryKey: [...queryKey, roleName, domain, feature, action],
    queryFn: () => getRolePermissionByPolicy(roleName, domain, feature, action),
    enabled: !!roleName && !!domain && !!feature && !!action,
  });
}

export function useCreateRolePermissionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserManagement.RolePermissionCreate) => {
      let anySuccess = false;
      for (const feature of data.feature) {
        const result = await createRolePermission({
          roleName: data.roleName,
          domain: data.domain,
          feature,
          action: data.action,
        });
        if (result !== undefined) anySuccess = true;
      }
      return anySuccess;
    },
    onSuccess(data) {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
}

export function useDeleteRolePermissionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items: UserManagement.RolePermissionList[]) => {
      for (const item of items) {
        await deleteRolePermission(
          item.roleName,
          item.domain,
          item.feature,
          item.action
        );
      }
      return true;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
}
