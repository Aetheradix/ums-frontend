import { ApiService } from '../../../../services';

const UserRoleMapping_URL = `UserManagement/userRolesMappings`;

export function getUserRoleMappings() {
  return ApiService.getList<Master.UserManagement.UserRoleMappingItem>(
    UserRoleMapping_URL
  );
}

export async function getUserRoleMapping(id: number) {
  const { data } =
    await ApiService.get<Master.UserManagement.UserRoleMappingItem>(
      `${UserRoleMapping_URL}/${id}`
    );
  return data;
}

export async function createUserRoleMapping(
  form: Master.UserManagement.UserRoleMappingForm
) {
  const { error, data } =
    await ApiService.post<Master.UserManagement.UserRoleMappingItem>(
      UserRoleMapping_URL,
      form
    );
  return !error ? data : undefined;
}

export async function updateUserRoleMapping(
  id: number,
  form: Master.UserManagement.UserRoleMappingForm
): Promise<boolean> {
  const result = await ApiService.put(`${UserRoleMapping_URL}/${id}`, form);
  return !result.error;
}

export async function patchUserRoleMappingStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(`${UserRoleMapping_URL}/${id}`, {});

  return !result.error;
}
