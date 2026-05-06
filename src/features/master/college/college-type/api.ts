import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const COLLEGE_TYPE_URL = `${MASTER_API_ROOT}college-types`;

export function getCollegeTypes() {
  return ApiService.getList<Master.College.CollegeTypeItem>(COLLEGE_TYPE_URL);
}

export async function getCollegeType(id: number) {
  const { data } = await ApiService.get<Master.College.CollegeTypeItem>(
    `${COLLEGE_TYPE_URL}/${id}`
  );
  return data;
}

export async function createCollegeType(form: Master.College.CollegeTypeForm) {
  const { error, data } = await ApiService.post<Master.College.CollegeTypeItem>(
    COLLEGE_TYPE_URL,
    form
  );

  return !error ? data : undefined;
}

export async function updateCollegeType(
  id: number,
  form: Master.College.CollegeTypeForm
): Promise<boolean> {
  const result = await ApiService.put(`${COLLEGE_TYPE_URL}/${id}`, form);
  return !result.error;
}

export async function deleteCollegeType(id: number): Promise<boolean> {
  const result = await ApiService.del(`${COLLEGE_TYPE_URL}/${id}`);
  return !result.error;
}

export async function patchCollegeTypeStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(`${COLLEGE_TYPE_URL}/${id}/status`, {});
  return !result.error;
}
