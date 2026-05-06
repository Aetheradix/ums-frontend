import { ApiService } from 'services';

const COURSE_DEPARTMENT_URL = `master/course-modes-of-education`;
export function getCourseModeOfEducations() {
  return ApiService.getList<CourseMaster.CourseModeOfEducationItem>(
    COURSE_DEPARTMENT_URL
  );
}

export async function getCourseModeOfEducation(id: number) {
  const { data } = await ApiService.get<CourseMaster.CourseModeOfEducationItem>(
    `${COURSE_DEPARTMENT_URL}/${id}`
  );
  return data;
}

export async function createCourseModeOfEducation(
  form: CourseMaster.CourseModeOfEducationForm
) {
  const { error, data } =
    await ApiService.post<CourseMaster.CourseModeOfEducationItem>(
      COURSE_DEPARTMENT_URL,
      form
    );
  return !error ? data : undefined;
}

export async function updateCourseModeOfEducation(
  id: number,
  form: CourseMaster.CourseModeOfEducationForm
): Promise<boolean> {
  const result = await ApiService.put(`${COURSE_DEPARTMENT_URL}/${id}`, form);
  return !result.error;
}

export async function patchCourseModeOfEducationStatus(
  id: number
): Promise<boolean> {
  const result = await ApiService.patch(
    `${COURSE_DEPARTMENT_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
