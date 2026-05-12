import { collegeCategoryUrls } from './college/college-category/urls';
import { collegeTypeUrls } from './college/college-type/urls';
import { courseExamTypeUrls } from './course/course-exam-type/urls';
import { courseModeOfEducationUrls } from './course/course-mode-of-education/urls';
import { courseStreamUrls } from './course/course-stream/urls';
import { departmentUrls } from './faculty/department/urls';
import { designationUrls } from './faculty/designation/urls';
import { facultyUrls } from './faculty/faculty/urls';
import { officeTypeUrls } from './faculty/office-type/urls';
import { grantCategoryUrls } from './grant/grant-category/urls';
import { grantTypeUrls } from './grant/grant-type/urls';
import { eligibilityApplicationProcessUrls } from './grant/eligibility-application-process/urls';
import { casteUrls } from './hr/caste/urls';
import { qualificationUrls } from './hr/qualification/urls';
import { religionUrls } from './hr/religion/urls';
import { blockUrls } from './location/block/urls';
import { districtUrls } from './location/district/urls';
import { divisionUrls } from './location/division/urls';
import { stateUrls } from './location/state/urls';
import { tehsilUrls } from './location/tehsil/urls';
import { academicYearUrls } from './other/academic-year/urls';
import { degreeLevelUrls } from './other/degree-level/urls';
import { programmeUrls } from './other/programme/urls';
import { specialisationUrls } from './other/specialisation/urls';
import { schemeCategoryUrls } from './schemes/scheme-category/urls';
import { schemeTypeUrls } from './schemes/scheme-type/urls';
import { schemeUrls } from './schemes/scheme/urls';

const baseUrl = '/master';
export const masterUrls = {
  courseExamType: courseExamTypeUrls(baseUrl),
  courseModeOfEducation: courseModeOfEducationUrls(baseUrl),
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
  collegeType: collegeTypeUrls(`${baseUrl}/college`),
  collegeCategory: collegeCategoryUrls(`${baseUrl}/college`),
  faculty: facultyUrls(`${baseUrl}/faculty-management`),
  degreeLevel: degreeLevelUrls(`${baseUrl}/other`),
  academicYear: academicYearUrls(`${baseUrl}/other`),
  programme: programmeUrls(`${baseUrl}/other`),
  scheme: schemeUrls(`${baseUrl}/scheme`),
  schemeType: schemeTypeUrls(`${baseUrl}/scheme`),
  schemeCategory: schemeCategoryUrls(`${baseUrl}/scheme`),
  specialisation: specialisationUrls(`${baseUrl}/other`),
  grantType: grantTypeUrls(`${baseUrl}/grant`),
  grantCategory: grantCategoryUrls(`${baseUrl}/grant`),
  eligibilityApplicationProcess: eligibilityApplicationProcessUrls(`${baseUrl}/grant`),
};
