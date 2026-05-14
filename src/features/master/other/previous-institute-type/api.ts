import { ApiService } from 'services';

//const PREVIOUS_INSTITUTE_TYPE_URL = `master/previous-institute-type`;
const PREVIOUS_INSTITUTION_TYPE_URL = `master/previous-institution-type`;

export function getPreviousInstitutionType() {
  return ApiService.getList<Master.Other.PreviousInstituteTypeItem>(
    PREVIOUS_INSTITUTION_TYPE_URL
  );
}
