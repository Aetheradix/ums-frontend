import { ApiService } from 'services';

const Level_TYPE_URL = `master/level`;

export function getLevel() {
  return ApiService.getList<GrievanceManagement.Other.LevelItem>(
    Level_TYPE_URL
  );
}
