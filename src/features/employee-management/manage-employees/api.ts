import { ApiService } from 'services';
import { EMPLOYEE_BASIC_URL, EMPLOYEE_URL } from './urls';

export async function getBasicEmployees(pageNumber: number, pageSize: number) {
  const { error, data } = await ApiService.get<
    Api.PagedResponse<EmployeeManagement.EmployeeBasicInfoDto>
  >(`${EMPLOYEE_BASIC_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);

  return !error && data ? data : undefined;
}

export async function getEmployeeById(id: number) {
  const { error, data } = await ApiService.get<EmployeeManagement.EmployeeDto>(
    `${EMPLOYEE_URL}/${id}`
  );

  return !error ? data : undefined;
}
