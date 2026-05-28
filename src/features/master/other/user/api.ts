import { ApiService } from 'services';

const USER_URL = `master/userManagement/users`;

export function getUsers() {
  return ApiService.getList<Master.Other.Users>(USER_URL);
}
