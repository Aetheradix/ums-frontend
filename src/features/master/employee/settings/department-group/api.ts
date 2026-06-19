import { ApiService } from 'services';

const MASTER_API_ROOT = `master/`;

const DEPARTMENT_GROUP_URL = `${MASTER_API_ROOT}department-group`;

export async function getDepartmentGroups() {
  const result = await ApiService.getList<any>(DEPARTMENT_GROUP_URL);
  if (!result) return [];

  return result.map(item => ({
    ...item,
    id: item.departmentGroupId,
  })) as Master.Employee.DepartmentGroupItem[];
}

export async function getDepartmentGroup(id: number) {
  const { data } = await ApiService.get<any>(`${DEPARTMENT_GROUP_URL}/${id}`);
  if (!data) return undefined;

  return {
    ...data,
    id: data.departmentGroupId,
  } as Master.Employee.DepartmentGroupItem;
}

export async function createDepartmentGroup(
  form: Master.Employee.DepartmentGroupForm
) {
  const { error, data } =
    await ApiService.post<Master.Employee.DepartmentGroupItem>(
      DEPARTMENT_GROUP_URL,
      form
    );

  return !error ? data : undefined;
}

export async function updateDepartmentGroup(
  id: number,
  form: Master.Employee.DepartmentGroupForm
): Promise<boolean> {
  const result = await ApiService.put(`${DEPARTMENT_GROUP_URL}/${id}`, form);
  return !result.error;
}

export async function patchDepartmentGroupStatus(
  id: number,
  _isActive: boolean
): Promise<boolean> {
  const result = await ApiService.patch(
    `${DEPARTMENT_GROUP_URL}/${id}/status`,
    {}
  );

  return !result.error;
}
