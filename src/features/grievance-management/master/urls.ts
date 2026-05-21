import { grievanceCategoryUrls } from './grievance-category/urls';

const baseUrl = '/grievance-management/master';
export const masterUrls = {
  grievanceCategory: grievanceCategoryUrls(`${baseUrl}/grievance-category`),
};
