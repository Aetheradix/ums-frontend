import { ApiService } from 'services';

const COURSE_DEPARTMENT_URL = `master/course-streams`;

export function getCourseStreams() {
  return ApiService.getList<CourseMaster.CourseStreamItem>(
    COURSE_DEPARTMENT_URL
  );
}

export async function getCourseStream(id: number) {
  const { data } = await ApiService.get<CourseMaster.CourseStreamItem>(
    `${COURSE_DEPARTMENT_URL}/${id}`
  );
  return data;
}

export async function createCourseStream(form: CourseMaster.CourseStreamForm) {
  const { error, data } = await ApiService.post<CourseMaster.CourseStreamItem>(
    COURSE_DEPARTMENT_URL,
    form
  );
  return !error ? data : undefined;
}

export async function updateCourseStream(
  id: number,
  form: CourseMaster.CourseStreamForm
): Promise<boolean> {
  const result = await ApiService.put(`${COURSE_DEPARTMENT_URL}/${id}`, form);
  return !result.error;
}

export async function patchCourseStreamStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(
    `${COURSE_DEPARTMENT_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
