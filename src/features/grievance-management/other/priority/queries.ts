import { useQuery } from '@tanstack/react-query';
import { getPriority } from './api';

const QUERY_KEY = ['@master/Priority-type'];

export function usePriorityTypeQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getPriority,
  });
  return { data, isLoading };
}
