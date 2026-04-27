import { subjectCategoryUrls } from './course/subject-category/urls';
import { officeTypeUrls } from './faculty/office-type/urls';

const baseUrl = '/master';
export const masterUrls = {
  subjectCategory: subjectCategoryUrls(baseUrl),
  officeType: officeTypeUrls(baseUrl),
};
