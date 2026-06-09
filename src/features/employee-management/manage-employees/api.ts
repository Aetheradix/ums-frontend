import { ApiService } from 'services';
import { EMPLOYEE_BASIC_URL } from './urls';

export async function getBasicEmployees() {
  const { error, data } =
    await ApiService.get<EmployeeManagement.EmployeeBasicInfoDto[]>(
      EMPLOYEE_BASIC_URL
    );

  return !error ? data : [];
}
