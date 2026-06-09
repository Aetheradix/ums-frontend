import { ApiService } from 'services';
import { EMPLOYEE_MY_PROFILE_URL, EMPLOYEE_URL } from './urls';

export async function getEmployeeById(id: number) {
  const { error, data } = await ApiService.get<EmployeeManagement.EmployeeDto>(
    `${EMPLOYEE_URL}/${id}`
  );

  return !error ? data : undefined;
}

export async function getMyProfile() {
  const { error, data } = await ApiService.get<EmployeeManagement.EmployeeDto>(
    EMPLOYEE_MY_PROFILE_URL
  );

  return !error ? data : undefined;
}
