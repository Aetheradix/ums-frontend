import { ApiService } from 'services';

const COURSE_DEPARTMENT_URL = `master/course-tenures`;

export function getCourseTenures() {
  return ApiService.getList<CourseMaster.CourseTenureItem>(
    COURSE_DEPARTMENT_URL
  );
}

export async function getCourseTenure(id: number) {
  const { data } = await ApiService.get<CourseMaster.CourseTenureItem>(
    `${COURSE_DEPARTMENT_URL}/${id}`
  );
  return data;
}

export async function createCourseTenure(form: CourseMaster.CourseTenureForm) {
  const { error, data } = await ApiService.post<CourseMaster.CourseTenureItem>(
    COURSE_DEPARTMENT_URL,
    form
  );
  return !error ? data : undefined;
}

export async function updateCourseTenure(
  id: number,
  form: CourseMaster.CourseTenureForm
): Promise<boolean> {
  const result = await ApiService.put(`${COURSE_DEPARTMENT_URL}/${id}`, form);
  return !result.error;
}

export async function patchCourseTenureStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(
    `${COURSE_DEPARTMENT_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
