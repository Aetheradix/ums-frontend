import { collegeCategoryUrls } from './college/college-category/urls';
import { collegeTypeUrls } from './college/college-type/urls';
import { subjectCategoryUrls } from './course/subject-category/urls';
import { officeTypeUrls } from './faculty/office-type/urls';

const baseUrl = '/master';
export const masterUrls = {
  subjectCategory: subjectCategoryUrls(baseUrl),
  officeType: officeTypeUrls(baseUrl),
  collegeCategory: collegeCategoryUrls(baseUrl),
  collegeType: collegeTypeUrls(baseUrl),
};
