import { ApiService } from 'services';

const COURSE_EXAM_TYPE_URl = `api/master/course-exam-types`;

export function getCourseExamTypes() {
  return ApiService.getList<CourseMaster.CourseExamTypeItem>(
    COURSE_EXAM_TYPE_URl
  );
}

export async function getCourseExamType(id: number) {
  const { data } = await ApiService.get<CourseMaster.CourseExamTypeItem>(
    `${COURSE_EXAM_TYPE_URl}/${id}`
  );
  return data;
}

export async function createCourseExamType(
  form: CourseMaster.CourseExamTypeForm
) {
  const { error, data } =
    await ApiService.post<CourseMaster.CourseExamTypeForm>(
      COURSE_EXAM_TYPE_URl,
      form
    );
  return !error ? data : undefined;
}

export async function updateCourseExamType(
  id: number,
  form: CourseMaster.CourseExamTypeForm
): Promise<boolean> {
  const result = await ApiService.put(`${COURSE_EXAM_TYPE_URl}/${id}`, form);
  return !result.error;
}

export async function patchCourseExamTypeStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(
    `${COURSE_EXAM_TYPE_URl}/${id}/status`,
    {}
  );
  return !result.error;
}
