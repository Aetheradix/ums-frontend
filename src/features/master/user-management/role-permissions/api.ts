import ApiService from 'services/api';

const ROLE_PERMISSIONS_URL = `user-management/role-permissions`;
const FEATURES_URL = `user-management/features`;
const RIGHTS_URL = `user-management/rights`;

export async function getFeatures(): Promise<UserManagement.FeatureItem[]> {
  const response =
    await ApiService.get<UserManagement.FeatureItem[]>(FEATURES_URL);
  return response.data ?? [];
}

export async function getRights(): Promise<UserManagement.RightItem[]> {
  const response = await ApiService.get<UserManagement.RightItem[]>(RIGHTS_URL);
  return response.data ?? [];
}

export async function getRolePermissionByPolicy(
  roleName: string,
  domain: string,
  feature: string,
  action: string
): Promise<UserManagement.RolePermissionList> {
  const url = `${ROLE_PERMISSIONS_URL}/${encodeURIComponent(roleName)}/${encodeURIComponent(domain)}/${encodeURIComponent(feature)}/${encodeURIComponent(action)}`;
  const response = await ApiService.get<UserManagement.RolePermissionList>(url);
  return response.data!;
}

export async function getRolePermissions(): Promise<
  UserManagement.RolePermissionList[]
> {
  const response =
    await ApiService.get<UserManagement.RolePermissionList[]>(
      ROLE_PERMISSIONS_URL
    );
  return response.data ?? [];
}

type RolePermissionPayload = {
  roleName: string;
  domain: string;
  feature: string;
  action: string;
};

export async function createRolePermission(data: RolePermissionPayload) {
  const { error, data: result } = await ApiService.post<RolePermissionPayload>(
    ROLE_PERMISSIONS_URL,
    data
  );
  return !error ? result : undefined;
}

export async function deleteRolePermission(
  roleName: string,
  domain: string,
  feature: string,
  action: string
): Promise<boolean> {
  const url = `${ROLE_PERMISSIONS_URL}/${encodeURIComponent(roleName)}/${encodeURIComponent(domain)}/${encodeURIComponent(feature)}/${encodeURIComponent(action)}`;
  const { error } = await ApiService.del(url);
  return !error;
}
