import { useQuery } from '@tanstack/react-query';
import { getLevel } from './api';

const QUERY_KEY = ['@master/level-type'];

export function useLevelTypeQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getLevel,
  });
  return { data, isLoading };
}
