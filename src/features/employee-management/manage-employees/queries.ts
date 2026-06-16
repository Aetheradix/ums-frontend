import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getBasicEmployees, getEmployeeById } from './api';

const BASIC_EMPLOYEES_KEY = ['@employee/basic'];
const EMPLOYEE_BY_ID_KEY = ['@employee/detail'];

export function useGetBasicEmployeesQuery(
  pageNumber: number,
  pageSize: number
) {
  return useQuery({
    queryKey: [...BASIC_EMPLOYEES_KEY, pageNumber, pageSize],
    queryFn: async () => await getBasicEmployees(pageNumber, pageSize),
    placeholderData: keepPreviousData,
  });
}

export function useGetEmployeeByIdQuery(id: number) {
  return useQuery({
    queryKey: [...EMPLOYEE_BY_ID_KEY, id],
    queryFn: async () => await getEmployeeById(id),
    enabled: !!id,
  });
}
