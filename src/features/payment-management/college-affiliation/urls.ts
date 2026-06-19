import { paymentManagementUrls } from '../urls';

const baseUrl = paymentManagementUrls.collegeAffiliation;

export const collegeAffiliationTransactionUrls = {
  base: baseUrl,
  list: baseUrl,
  view: (id: number | string) => `${baseUrl}/${id}`,
};
