import { subjectCategoryUrls } from './course/subject-category/urls';

const baseUrl = '/master';
export const masterUrls = {
  subjectCategory: subjectCategoryUrls(baseUrl),
};
