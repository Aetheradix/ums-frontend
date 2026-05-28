import { ApiService } from 'services';

const PRIORITY_TYPE_URL = `master/priority`;

export function getPriority() {
  return ApiService.getList<GrievanceManagement.Other.PriorityItem>(
    PRIORITY_TYPE_URL
  );
}
