import { useQuery } from '@tanstack/react-query';
import { getStageApplyingOptions } from './api';

const QUERY_KEY = ['@master/stage-applying'];

export function useStageApplyingQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getStageApplyingOptions,
  });
  return { data, isLoading };
}
