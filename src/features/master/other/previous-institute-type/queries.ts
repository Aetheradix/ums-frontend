import { useQuery } from '@tanstack/react-query';
import { getPreviousInstituteType } from './api';

const QUERY_KEY = ['@master/previous-institute-type'];

export function usePreviousInstituteTypeQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getPreviousInstituteType,
  });
  return { data, isLoading };
}
