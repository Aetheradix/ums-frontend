import { subjectCategoryUrls } from './course/subject-category/urls';
import { departmentUrls } from './faculty/department/urls';
import { officeTypeUrls } from './faculty/office-type/urls';
import { blockUrls } from './location/block/urls';
import { districtUrls } from './location/district/urls';
import { divisionUrls } from './location/division/urls';
import { stateUrls } from './location/state/urls';
import { tehsilUrls } from './location/tehsil/urls';

const baseUrl = '/master';
export const masterUrls = {
  subjectCategory: subjectCategoryUrls(baseUrl),
  officeType: officeTypeUrls(baseUrl),
  department: departmentUrls(baseUrl),
  state: stateUrls(baseUrl),
  division: divisionUrls(baseUrl),
  district: districtUrls(baseUrl),
  tehsil: tehsilUrls(baseUrl),
  block: blockUrls(baseUrl),
};
