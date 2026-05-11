import { useQuery } from '@tanstack/react-query';
import { getNationalities } from './api';

const QUERY_KEY = ['@master/nationality'];

export function useNationalitiesQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getNationalities,
  });
  return { data, isLoading };
}
