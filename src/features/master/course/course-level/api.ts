import { ApiService } from 'services';

const COURSE_Level_URL = `api/master/course-levels`;

export function getCourseLevels() {
  return ApiService.getList<CourseMaster.CourseLevelItem>(COURSE_Level_URL);
}

export async function getCourseLevel(id: number) {
  const { data } = await ApiService.get<CourseMaster.CourseLevelItem>(
    `${COURSE_Level_URL}/${id}`
  );
  return data;
}

export async function createCourseLevel(form: CourseMaster.CourseLevelForm) {
  const { error, data } = await ApiService.post<CourseMaster.CourseLevelItem>(
    COURSE_Level_URL,
    form
  );
  return !error ? data : undefined;
}

export async function updateCourseLevel(
  id: number,
  form: CourseMaster.CourseLevelForm
): Promise<boolean> {
  const result = await ApiService.put(`${COURSE_Level_URL}/${id}`, form);
  return !result.error;
}

export async function patchCourseLevelStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(`${COURSE_Level_URL}/${id}/status`, {});
  return !result.error;
}
