import { ApiService } from 'services';

const Role_URL = `userManagement/roles`;

export function getRoles() {
  return ApiService.getList<Master.UserManagement.RoleItem>(Role_URL);
}

export async function getRole(id: string) {
  const { data } = await ApiService.get<Master.UserManagement.RoleItem>(
    `${Role_URL}/${id}`
  );
  return data;
}

export async function createRole(form: Master.UserManagement.RoleForm) {
  const { error, data } = await ApiService.post<Master.UserManagement.RoleItem>(
    Role_URL,
    form
  );
  return !error ? data : undefined;
}

export async function updateRole(
  id: string,
  form: Master.UserManagement.RoleForm
): Promise<boolean> {
  const result = await ApiService.put(`${Role_URL}/${id}`, form);
  return !result.error;
}

export async function patchRoleStatus(id: string): Promise<boolean> {
  const result = await ApiService.patch(`${Role_URL}/${id}`, {});

  return !result.error;
}
