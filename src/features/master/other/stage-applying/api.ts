import { ApiService } from 'services';

const STAGE_APPLYING_URL = `master/stage-applying`;

export function getStageApplyingOptions() {
  return ApiService.getList<Master.Other.StageApplyingItem>(STAGE_APPLYING_URL);
}
