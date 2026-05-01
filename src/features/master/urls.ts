import { subjectCategoryUrls } from './course/subject-category/urls';
import { departmentUrls } from './faculty/department/urls';
import { designationUrls } from './faculty/designation/urls';
import { officeTypeUrls } from './faculty/office-type/urls';
import { blockUrls } from './location/block/urls';
import { districtUrls } from './location/district/urls';
import { divisionUrls } from './location/division/urls';
import { stateUrls } from './location/state/urls';
import { tehsilUrls } from './location/tehsil/urls';

const baseUrl = '/master';
export const masterUrls = {
  subjectCategory: subjectCategoryUrls(baseUrl),
  officeType: officeTypeUrls(`${baseUrl}/faculty-management`),
  department: departmentUrls(`${baseUrl}/faculty-management`),
  state: stateUrls(`${baseUrl}/location`),
  division: divisionUrls(`${baseUrl}/location`),
  district: districtUrls(`${baseUrl}/location`),
  tehsil: tehsilUrls(`${baseUrl}/location`),
  block: blockUrls(`${baseUrl}/location`),
  designation: designationUrls(`${baseUrl}/faculty-management`),
};
