import { useQuery } from '@tanstack/react-query';
import { getResponseStatus } from './api';

const QUERY_KEY = ['@master/Response-status'];

export function useResponseStatusQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getResponseStatus,
  });
  return { data, isLoading };
}
