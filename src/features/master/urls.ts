import { subjectCategoryUrls } from './course/subject-category/urls';
import { departmentUrls } from './faculty/department/urls';
import { officeTypeUrls } from './faculty/office-type/urls';
import { districtUrls } from './location/district/urls';
import { divisionUrls } from './location/division/urls';
import { stateUrls } from './location/state/urls';

const baseUrl = '/master';
export const masterUrls = {
  subjectCategory: subjectCategoryUrls(baseUrl),
  officeType: officeTypeUrls(baseUrl),
  department: departmentUrls(baseUrl),
  state: stateUrls(baseUrl),
  division: divisionUrls(baseUrl),
  district: districtUrls(baseUrl),
};
