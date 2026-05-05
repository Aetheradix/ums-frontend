import { ApiService } from 'services';

const ACADEMIC_YEAR_URL = `master/academic-years`;

export function getAcademicYears() {
  return ApiService.getList<Master.AcademicYearItem>(ACADEMIC_YEAR_URL);
}

export async function getAcademicYear(id: number) {
  const { data } = await ApiService.get<Master.AcademicYearItem>(
    `${ACADEMIC_YEAR_URL}/${id}`
  );
  return data;
}

export async function createAcademicYear(form: Master.AcademicYearForm) {
  const { error, data } = await ApiService.post<Master.AcademicYearItem>(
    ACADEMIC_YEAR_URL,
    form
  );
  return !error ? data : undefined;
}

export async function updateAcademicYear(
  id: number,
  form: Master.AcademicYearForm
): Promise<boolean> {
  const result = await ApiService.put(`${ACADEMIC_YEAR_URL}/${id}`, form);
  return !result.error;
}

export async function patchAcademicYearStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(`${ACADEMIC_YEAR_URL}/${id}`, {});

  return !result.error;
}
