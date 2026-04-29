import { subjectCategoryUrls } from './course/subject-category/urls';
import { departmentUrls } from './faculty/department/urls';
import { officeTypeUrls } from './faculty/office-type/urls';

const baseUrl = '/master';
export const masterUrls = {
  subjectCategory: subjectCategoryUrls(baseUrl),
  officeType: officeTypeUrls(baseUrl),
  department: departmentUrls(baseUrl),
};
