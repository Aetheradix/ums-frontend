import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const DEPARTMENT_GROUP_TYPE_URL = `${MASTER_API_ROOT}department-group-type`;

export function getDepartmentGroupTypes() {
  return ApiService.getList<Master.Employee.DepartmentGroupTypeItem>(
    DEPARTMENT_GROUP_TYPE_URL
  );
}

export async function getDepartmentGroupType(id: number) {
  const { data } =
    await ApiService.get<Master.Employee.DepartmentGroupTypeForm>(
      `${DEPARTMENT_GROUP_TYPE_URL}/${id}`
    );

  return data;
}

export async function createDepartmentGroupType(
  form: Master.Employee.DepartmentGroupTypeForm
) {
  const { error, data } =
    await ApiService.post<Master.Employee.DepartmentGroupTypeForm>(
      DEPARTMENT_GROUP_TYPE_URL,
      form
    );

  return !error ? data : undefined;
}

export async function updateDepartmentGroupType(
  id: number,
  form: Master.Employee.DepartmentGroupTypeForm
): Promise<boolean> {
  const result = await ApiService.put(
    `${DEPARTMENT_GROUP_TYPE_URL}/${id}`,
    form
  );

  return !result.error;
}

export async function patchDepartmentGroupTypeStatus(
  id: number,
  isActive: boolean
): Promise<boolean> {
  const result = await ApiService.patch(
    `${DEPARTMENT_GROUP_TYPE_URL}/${id}/status`,
    {
      isActive,
    }
  );

  return !result.error;
}
