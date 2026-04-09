import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const SUBJECT_CATEGORY_URL = `${MASTER_API_ROOT}subject-category`;

export function getSubjectCategories() {
  return ApiService.getList<CourseMaster.SubjectCategoryItem>(
    SUBJECT_CATEGORY_URL
  );
}

export async function getSubjectCategory(id: number) {
  const { data } = await ApiService.get<CourseMaster.SubjectCategoryItem>(
    `${SUBJECT_CATEGORY_URL}/${id}`
  );
  return data;
}

export async function createSubjectCategory(
  form: CourseMaster.SubjectCategoryCourseForm
) {
  const { error, data } =
    await ApiService.post<CourseMaster.SubjectCategoryItem>(
      SUBJECT_CATEGORY_URL,
      form
    );

  return !error ? data : undefined;
}

export async function updateSubjectCategory(
  id: number,
  form: CourseMaster.SubjectCategoryCourseForm
): Promise<boolean> {
  const result = await ApiService.put(`${SUBJECT_CATEGORY_URL}/${id}`, form);
  return !result.error;
}

export async function patchSubjectCategoryStatus(
  id: number,
  isActive: boolean
): Promise<boolean> {
  const result = await ApiService.patch(
    `${SUBJECT_CATEGORY_URL}/${id}/active`,
    {
      isActive,
    }
  );

  return !result.error;
}
