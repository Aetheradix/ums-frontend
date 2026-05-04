import { ApiService } from 'services';

const COURSE_DEPARTMENT_URL = `api/master/course-departments`;

export function getCourseDepartments() {
  return ApiService.getList<CourseMaster.CourseDepartmentItem>(
    COURSE_DEPARTMENT_URL
  );
}

export async function getCourseDepartment(id: number) {
  const { data } = await ApiService.get<CourseMaster.CourseDepartmentItem>(
    `${COURSE_DEPARTMENT_URL}/${id}`
  );
  return data;
}

export async function createCourseDepartment(
  form: CourseMaster.CourseDepartmentForm
) {
  const { error, data } =
    await ApiService.post<CourseMaster.CourseDepartmentItem>(
      COURSE_DEPARTMENT_URL,
      form
    );
  return !error ? data : undefined;
}

export async function updateCourseDepartment(
  id: number,
  form: CourseMaster.CourseDepartmentForm
): Promise<boolean> {
  const result = await ApiService.put(`${COURSE_DEPARTMENT_URL}/${id}`, form);
  return !result.error;
}

export async function patchCourseDepartmentStatus(
  id: number
): Promise<boolean> {
  const result = await ApiService.patch(
    `${COURSE_DEPARTMENT_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
