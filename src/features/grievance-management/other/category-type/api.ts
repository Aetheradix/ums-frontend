import { ApiService } from 'services';

const CATEGORY_TYPE_URL = `master/category-type`;

export function getCategoryType() {
  return ApiService.getList<GrievanceManagement.Other.CategoryTypeItem>(
    CATEGORY_TYPE_URL
  );
}
