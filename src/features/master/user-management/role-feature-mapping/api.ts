import { ApiService } from 'services';

const URL = `userManagement/roleFeaturesMappings`;

export function getRoleFeatureMappings() {
  return ApiService.getList<Master.UserManagement.RoleFeatureMappingForm>(URL);
}

export async function addRoleFeatureMapping(
  form: Master.UserManagement.RoleFeatureMappingForm
) {
  const result = await ApiService.post(URL, form);
  return !result.error;
}

export async function removeRoleFeatureMapping(
  form: Master.UserManagement.RoleFeatureMappingForm
) {
  const result = await ApiService.del(URL, form);
  return !result.error;
}
