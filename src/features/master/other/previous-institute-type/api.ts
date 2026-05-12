import { ApiService } from 'services';

//const PREVIOUS_INSTITUTE_TYPE_URL = `master/previous-institute-type`;
const PREVIOUS_INSTITUTE_TYPE_URL = `master/course-type`;

export function getPreviousInstituteType() {
  return ApiService.getList<Master.Other.PreviousInstituteTypeItem>(
    PREVIOUS_INSTITUTE_TYPE_URL
  );
}
