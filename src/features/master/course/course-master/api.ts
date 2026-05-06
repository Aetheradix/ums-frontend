import { ApiService } from 'services';

const COURSE_DEPARTMENT_URL = `master/courses`;

export function getCourseMasters() {
  return ApiService.getList<CourseMaster.CourseMasterItem>(
    COURSE_DEPARTMENT_URL
  );
}

export async function getCourseMaster(id: number) {
  const { data } = await ApiService.get<CourseMaster.CourseMasterItem>(
    `${COURSE_DEPARTMENT_URL}/${id}`
  );
  return data;
}

export async function createCourseMaster(form: CourseMaster.CourseMasterForm) {
  const { error, data } = await ApiService.post<CourseMaster.CourseMasterItem>(
    COURSE_DEPARTMENT_URL,
    form
  );
  return !error ? data : undefined;
}

export async function updateCourseMaster(
  id: number,
  form: CourseMaster.CourseMasterForm
): Promise<boolean> {
  const result = await ApiService.put(`${COURSE_DEPARTMENT_URL}/${id}`, form);
  return !result.error;
}

export async function patchCourseMasterStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(
    `${COURSE_DEPARTMENT_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
