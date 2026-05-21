import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const GRIEVANCE_CATEGORY_URL = `${MASTER_API_ROOT}categories`;

export function getGrievanceCategories() {
  return ApiService.getList<GrievanceCategoryMaster.GrievanceCategoryItem>(
    GRIEVANCE_CATEGORY_URL
  );
}

export async function getGrievanceCategory(id: number) {
  const { data } =
    await ApiService.get<GrievanceCategoryMaster.GrievanceCategoryItem>(
      `${GRIEVANCE_CATEGORY_URL}/${id}`
    );
  return data;
}

export async function createGrievanceCategory(
  form: GrievanceCategoryMaster.GrievanceCategoryForm
) {
  const { error, data } =
    await ApiService.post<GrievanceCategoryMaster.GrievanceCategoryItem>(
      GRIEVANCE_CATEGORY_URL,
      form
    );

  return !error ? data : undefined;
}

export async function updateGrievanceCategory(
  id: number,
  form: GrievanceCategoryMaster.GrievanceCategoryForm
): Promise<boolean> {
  const result = await ApiService.put(`${GRIEVANCE_CATEGORY_URL}/${id}`, form);
  return !result.error;
}

export async function deleteGrievanceCategory(id: number): Promise<boolean> {
  const result = await ApiService.del(`${GRIEVANCE_CATEGORY_URL}/${id}`);
  return !result.error;
}

export async function patchGrievanceCategoryStatus(
  id: number
): Promise<boolean> {
  const result = await ApiService.patch(
    `${GRIEVANCE_CATEGORY_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
