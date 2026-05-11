import { useQuery } from '@tanstack/react-query';
import { getSemester } from './api';

const QUERY_KEY = ['@master/semester'];

export function useSemesterQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getSemester,
  });
  return { data, isLoading };
}
