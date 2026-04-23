import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const OFFICE_TYPE_URL = `${MASTER_API_ROOT}office-type`;

export function getOfficeTypes() {
  return ApiService.getList<OfficeTypeMaster.OfficeTypeItem>(OFFICE_TYPE_URL);
}

export async function getOfficeType(id: number) {
  const { data } = await ApiService.get<OfficeTypeMaster.OfficeTypeItem>(
    `${OFFICE_TYPE_URL}/${id}`
  );
  return data;
}

export async function createOfficeType(form: OfficeTypeMaster.OfficeTypeForm) {
  const { error, data } =
    await ApiService.post<OfficeTypeMaster.OfficeTypeItem>(
      OFFICE_TYPE_URL,
      form
    );

  return !error ? data : undefined;
}

export async function updateOfficeType(
  id: number,
  form: OfficeTypeMaster.OfficeTypeForm
): Promise<boolean> {
  const result = await ApiService.put(`${OFFICE_TYPE_URL}/${id}`, form);
  return !result.error;
}

export async function patchOfficeTypeStatus(
  id: number,
  isActive: boolean
): Promise<boolean> {
  const result = await ApiService.patch(`${OFFICE_TYPE_URL}/${id}/active`, {
    isActive,
  });

  return !result.error;
}
