import { useQuery } from '@tanstack/react-query';
import { getBasicEmployees } from './api';

const BASIC_EMPLOYEES_KEY = ['@employee/basic'];

export function useGetBasicEmployeesQuery() {
  return useQuery({
    queryKey: BASIC_EMPLOYEES_KEY,
    queryFn: async () => await getBasicEmployees(),
  });
}
