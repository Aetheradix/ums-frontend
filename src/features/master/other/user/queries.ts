import { useQuery } from '@tanstack/react-query';
import { getUsers } from './api';

const QUERY_KEY = ['@userManagement/users'];

export function useUserQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getUsers,
  });
  return { data, isLoading };
}
