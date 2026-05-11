import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const GRANT_TYPE_URL = `${MASTER_API_ROOT}grant-types`;

export function getGrantTypes() {
  return ApiService.getList<GrantMaster.GrantTypeItem>(GRANT_TYPE_URL);
}

export async function getGrantType(id: number) {
  const { data } = await ApiService.get<GrantMaster.GrantTypeItem>(
    `${GRANT_TYPE_URL}/${id}`
  );
  return data;
}

export async function createGrantType(form: GrantMaster.GrantTypeForm) {
  const { error, data } = await ApiService.post<GrantMaster.GrantTypeItem>(
    GRANT_TYPE_URL,
    form
  );

  return !error ? data : undefined;
}

export async function updateGrantType(
  id: number,
  form: GrantMaster.GrantTypeForm
): Promise<boolean> {
  const result = await ApiService.put(`${GRANT_TYPE_URL}/${id}`, form);
  return !result.error;
}

export async function deleteGrantType(id: number): Promise<boolean> {
  const result = await ApiService.del(`${GRANT_TYPE_URL}/${id}`);
  return !result.error;
}

export async function patchGrantTypeStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(`${GRANT_TYPE_URL}/${id}/status`, {});
  return !result.error;
}
