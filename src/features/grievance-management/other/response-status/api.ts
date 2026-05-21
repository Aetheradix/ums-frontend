import { ApiService } from 'services';

const RESPONSE_STATUS_TYPE_URL = `master/response-status`;

export function getResponseStatus() {
  return ApiService.getList<GrievanceManagement.Other.ResponseStatusItem>(
    RESPONSE_STATUS_TYPE_URL
  );
}
