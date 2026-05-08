import { ApiService } from 'services';

const RESIDENCY_STATUS_URL = `master/residency-status`;

export function getResidencyStatuses() {
  return ApiService.getList<Master.ResidencyStatusItem>(RESIDENCY_STATUS_URL);
}
