import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const NOC_TYPE_URL = `${MASTER_API_ROOT}noc-types`;

export function getNocTypes() {
  return ApiService.getList<CollegeMaster.NocTypeItem>(NOC_TYPE_URL);
}

export async function getNocType(id: number) {
  const { data } = await ApiService.get<CollegeMaster.NocTypeItem>(
    `${NOC_TYPE_URL}/${id}`
  );
  return data;
}

export async function createNocType(form: CollegeMaster.NocTypeForm) {
  const { error, data } = await ApiService.post<CollegeMaster.NocTypeItem>(
    NOC_TYPE_URL,
    form
  );

  return !error ? data : undefined;
}

export async function updateNocType(
  id: number,
  form: CollegeMaster.NocTypeForm
): Promise<boolean> {
  const result = await ApiService.put(`${NOC_TYPE_URL}/${id}`, form);
  return !result.error;
}

export async function deleteNocType(id: number): Promise<boolean> {
  const result = await ApiService.del(`${NOC_TYPE_URL}/${id}`);
  return !result.error;
}

export async function patchNocTypeStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(`${NOC_TYPE_URL}/${id}/status`, {});
  return !result.error;
}
