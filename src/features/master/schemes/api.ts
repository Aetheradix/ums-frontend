import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const SCHEME_TYPE_URL = `${MASTER_API_ROOT}scheme-types`;
const SCHEME_CATEGORY_URL = `${MASTER_API_ROOT}scheme-categories`;

// Scheme Type APIs
export function getSchemeTypes() {
  return ApiService.getList<Master.Scheme.SchemeTypeItem>(SCHEME_TYPE_URL);
}

export async function getSchemeType(id: number) {
  const { data } = await ApiService.get<Master.Scheme.SchemeTypeItem>(
    `${SCHEME_TYPE_URL}/${id}`
  );
  return data;
}

export async function createSchemeType(form: Master.Scheme.SchemeTypeForm) {
  const { error, data } = await ApiService.post<Master.Scheme.SchemeTypeItem>(
    SCHEME_TYPE_URL,
    form
  );

  return !error ? data : undefined;
}

export async function updateSchemeType(
  id: number,
  form: Master.Scheme.SchemeTypeForm
): Promise<boolean> {
  const result = await ApiService.put(`${SCHEME_TYPE_URL}/${id}`, form);
  return !result.error;
}

export async function deleteSchemeType(id: number): Promise<boolean> {
  const result = await ApiService.del(`${SCHEME_TYPE_URL}/${id}`);
  return !result.error;
}

export async function patchSchemeTypeStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(`${SCHEME_TYPE_URL}/${id}/status`, {});
  return !result.error;
}

// Scheme Category APIs
export function getSchemeCategories() {
  return ApiService.getList<Master.Scheme.SchemeCategoryItem>(
    SCHEME_CATEGORY_URL
  );
}

export async function getSchemeCategory(id: number) {
  const { data } = await ApiService.get<Master.Scheme.SchemeCategoryItem>(
    `${SCHEME_CATEGORY_URL}/${id}`
  );
  return data;
}

export async function createSchemeCategory(
  form: Master.Scheme.SchemeCategoryForm
) {
  const { error, data } =
    await ApiService.post<Master.Scheme.SchemeCategoryItem>(
      SCHEME_CATEGORY_URL,
      form
    );

  return !error ? data : undefined;
}

export async function updateSchemeCategory(
  id: number,
  form: Master.Scheme.SchemeCategoryForm
): Promise<boolean> {
  const result = await ApiService.put(`${SCHEME_CATEGORY_URL}/${id}`, form);
  return !result.error;
}

export async function deleteSchemeCategory(id: number): Promise<boolean> {
  const result = await ApiService.del(`${SCHEME_CATEGORY_URL}/${id}`);
  return !result.error;
}

export async function patchSchemeCategoryStatus(id: number): Promise<boolean> {
  const result = await ApiService.patch(
    `${SCHEME_CATEGORY_URL}/${id}/status`,
    {}
  );
  return !result.error;
}
