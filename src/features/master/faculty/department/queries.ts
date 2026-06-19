import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDepartment,
  getDepartment,
  getDepartments,
  patchDepartmentStatus,
  updateDepartment,
} from './api';

const QUERY_KEY = ['@master/department'];

export function useDepartmentsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getDepartments,
  });

  return { data, isLoading };
}

export function useCreateDepartmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.DepartmentForm) =>
      await createDepartment(data),

    onSuccess(data) {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDepartmentQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getDepartment(id);
      if (!data) return undefined;

      return {
        code: data.code,
        name: data.name,
        officeTypeId: data.officeTypeId,
        departmentGroupId: data.departmentGroupId,
        hodName: data.hodName,
        contactNumber: data.contactNumber,
      };
    },
  });
}

export function useUpdateDepartmentMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.DepartmentForm) =>
      await updateDepartment(id, data),

    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDepartmentActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchDepartmentStatus(data.id, data.isActive),

    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
