import { ApiService } from 'services';

const COLLEGE_AFFILIATION_TRANSACTION_URL = `payment-management/college-affiliation-transactions`;

export async function getCollegeAffiliationTransactions() {
  const { error, data } = await ApiService.get<any[]>(
    COLLEGE_AFFILIATION_TRANSACTION_URL
  );
  return !error ? data : undefined;
}
