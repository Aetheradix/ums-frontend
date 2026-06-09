import { ApiService } from 'services';

const PROGRAMME_FEE_URL = `master/programme-fee`;

export async function getProgrammeFees() {
  return ApiService.getList<AffiliationManagementSystem.ProgrammeFeeItem>(
    PROGRAMME_FEE_URL
  );
}
