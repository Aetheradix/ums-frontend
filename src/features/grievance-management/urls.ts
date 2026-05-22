import { categoryToUserMappingUrls } from './master/category-to-user/url';
import { grievanceCategoryUrls } from './master/grievance-category/urls';

const baseUrl = '/master';
export const masterUrls = {
  grievanceCategory: grievanceCategoryUrls(`${baseUrl}/grievance-category`),
  categoryToUserMapping: categoryToUserMappingUrls(
    `${baseUrl}/category-to-user-mapping`
  ),
};
