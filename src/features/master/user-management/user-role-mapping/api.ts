import { ApiService } from 'services';

const URL = `userManagement/userRolesMappings`;

export function getUserRoleMappings() {
  return ApiService.getList<Master.UserManagement.UserRoleMappingForm>(URL);
}

export async function addUserRoleMapping(
  form: Master.UserManagement.UserRoleMappingForm
) {
  const result = await ApiService.post(URL, form);
  return !result.error;
}

export async function removeUserRoleMapping(
  form: Master.UserManagement.UserRoleMappingForm
) {
  const result = await ApiService.del(URL, form);
  return !result.error;
}
