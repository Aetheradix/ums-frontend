import { collegeCategoryUrls } from './college/college-category/urls';
import { collegeTypeUrls } from './college/college-type/urls';
import { courseDepartmentUrls } from './course/course-department/urls';
import { courseExamTypeUrls } from './course/course-exam-type/urls';
import { courseLevelUrls } from './course/course-level/urls';
import { courseMasterUrls } from './course/course-master/urls';
import { courseModeOfEducationUrls } from './course/course-mode-of-education/urls';
import { courseStreamUrls } from './course/course-stream/urls';
import { courseTenureUrls } from './course/course-tenure/urls';
import { departmentUrls } from './faculty/department/urls';
import { designationUrls } from './faculty/designation/urls';
import { facultyUrls } from './faculty/faculty/urls';
import { officeTypeUrls } from './faculty/office-type/urls';
import { casteUrls } from './hr/caste/urls';
import { qualificationUrls } from './hr/qualification/urls';
import { religionUrls } from './hr/religion/urls';
import { blockUrls } from './location/block/urls';
import { districtUrls } from './location/district/urls';
import { divisionUrls } from './location/division/urls';
import { stateUrls } from './location/state/urls';
import { tehsilUrls } from './location/tehsil/urls';
import { roleUrls } from './user-management/role/urls';

const baseUrl = '/master';
export const masterUrls = {
  courseMaster: courseMasterUrls(baseUrl),
  courseExamType: courseExamTypeUrls(baseUrl),
  courseModeOfEducation: courseModeOfEducationUrls(baseUrl),
  courseLevel: courseLevelUrls(baseUrl),
  courseDepartment: courseDepartmentUrls(baseUrl),
  courseTenure: courseTenureUrls(baseUrl),
  courseStream: courseStreamUrls(baseUrl),
  officeType: officeTypeUrls(`${baseUrl}/faculty-management`),
  department: departmentUrls(`${baseUrl}/faculty-management`),
  state: stateUrls(`${baseUrl}/location`),
  division: divisionUrls(`${baseUrl}/location`),
  district: districtUrls(`${baseUrl}/location`),
  tehsil: tehsilUrls(`${baseUrl}/location`),
  block: blockUrls(`${baseUrl}/location`),
  designation: designationUrls(`${baseUrl}/faculty-management`),
  caste: casteUrls(`${baseUrl}/hr`),
  qualification: qualificationUrls(`${baseUrl}/hr`),
  religion: religionUrls(`${baseUrl}/hr`),
  role: roleUrls(`${baseUrl}/user-management`),
  collegeType: collegeTypeUrls(`${baseUrl}/college`),
  collegeCategory: collegeCategoryUrls(`${baseUrl}/college`),
  faculty: facultyUrls(`${baseUrl}/faculty-management`),
};
