import { useQuery } from '@tanstack/react-query';
import { getEmployeeById, getMyProfile } from './api';

const EMPLOYEE_DETAIL_KEY = ['@employee/detail'];

export function useGetEmployeeByIdQuery(id: number) {
  return useQuery({
    queryKey: [...EMPLOYEE_DETAIL_KEY, id],
    queryFn: async () => await getEmployeeById(id),
    enabled: !!id,
  });
}

export function useGetMyProfileQuery(enabled: boolean = true) {
  return useQuery({
    queryKey: [...EMPLOYEE_DETAIL_KEY, 'my-profile'],
    queryFn: async () => await getMyProfile(),
    enabled,
  });
}
