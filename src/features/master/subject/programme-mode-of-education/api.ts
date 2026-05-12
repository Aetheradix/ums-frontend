import { ApiService } from 'services';

const PROGRAMME_MODE_OF_EDUCATION_URL = `master/programme-modes-of-education`;
export function getProgrammeModeOfEducations() {
  return ApiService.getList<CourseMaster.ProgrammeModeOfEducationItem>(
    PROGRAMME_MODE_OF_EDUCATION_URL
  );
}

export async function getProgrammeModeOfEducation(id: number) {
  const { data } =
    await ApiService.get<CourseMaster.ProgrammeModeOfEducationItem>(
      `${PROGRAMME_MODE_OF_EDUCATION_URL}/${id}`
    );
  return data;
}

export async function createProgrammeModeOfEducation(
  form: CourseMaster.ProgrammeModeOfEducationForm
) {
  const { error, data } =
    await ApiService.post<CourseMaster.ProgrammeModeOfEducationItem>(
      PROGRAMME_MODE_OF_EDUCATION_URL,
      form
    );
  return !error ? data : undefined;
}

export async function updateProgrammeModeOfEducation(
  id: number,
  form: CourseMaster.ProgrammeModeOfEducationForm
): Promise<boolean> {
  const result = await ApiService.put(
    `${PROGRAMME_MODE_OF_EDUCATION_URL}/${id}`,
    form
  );
  return !result.error;
}

export async function patchProgrammeModeOfEducationStatus(
  id: number
): Promise<boolean> {
  const result = await ApiService.patch(
    `${PROGRAMME_MODE_OF_EDUCATION_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
