import { ApiService } from '../../../../services';

const User_URL = `userManagement/users`;

export function getUsers() {
  return ApiService.getList<Master.UserManagement.UserItem>(User_URL);
}

export async function getUser(id: string) {
  const { data } = await ApiService.get<Master.UserManagement.UserItem>(
    `${User_URL}/${id}`
  );
  return data;
}

export async function createUser(form: Master.UserManagement.UserForm) {
  const { error, data } = await ApiService.post<Master.UserManagement.UserItem>(
    User_URL,
    form
  );
  return !error ? data : undefined;
}

export async function updateUser(
  id: string,
  form: Master.UserManagement.UserForm
): Promise<boolean> {
  const result = await ApiService.put(`${User_URL}/${id}`, form);
  return !result.error;
}

export async function patchUserStatus(id: string): Promise<boolean> {
  const result = await ApiService.patch(`${User_URL}/${id}`, {});

  return !result.error;
}
