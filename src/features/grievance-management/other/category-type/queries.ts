import { useQuery } from '@tanstack/react-query';
import { getCategoryType } from './api';

const QUERY_KEY = ['@master/category-type'];

export function useCategoryTypeQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCategoryType,
  });
  return { data, isLoading };
}
