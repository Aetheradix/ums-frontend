import { useQuery } from '@tanstack/react-query';
import { getCollegeAffiliationTransactions } from './api';

export const collegeAffiliationTransactionKeys = {
  all: ['collegeAffiliationTransactions'] as const,
  lists: () => [...collegeAffiliationTransactionKeys.all, 'list'] as const,
};

export function useCollegeAffiliationTransactionsQuery() {
  return useQuery({
    queryKey: collegeAffiliationTransactionKeys.lists(),
    queryFn: getCollegeAffiliationTransactions,
  });
}
