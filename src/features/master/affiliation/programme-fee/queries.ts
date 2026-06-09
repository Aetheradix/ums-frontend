import { useQuery } from '@tanstack/react-query';
import { getProgrammeFees } from './api';

export const programmeFeeKeys = {
  all: ['programme-fees'] as const,
};

export const useProgrammeFeesQuery = () => {
  return useQuery<AffiliationManagementSystem.ProgrammeFeeItem[]>({
    queryKey: programmeFeeKeys.all,
    queryFn: getProgrammeFees,
  });
};
