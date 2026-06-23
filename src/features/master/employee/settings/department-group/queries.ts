import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDepartmentGroup,
  getDepartmentGroup,
  getDepartmentGroups,
  getDepartmentGroupsByGroupType,
  patchDepartmentGroupStatus,
  updateDepartmentGroup,
} from './api';

const QUERY_KEY = ['@master/department-group'];

export function useDepartmentGroupsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getDepartmentGroups,
  });

  return { data, isLoading };
}

export function useDepartmentGroupsByGroupTypeQuery(
  departmentGroupTypeId?: number
) {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [...QUERY_KEY, 'by-type', departmentGroupTypeId],
    queryFn: () => getDepartmentGroupsByGroupType(departmentGroupTypeId!),
    enabled: !!departmentGroupTypeId,
  });

  return { data, isLoading, refetch };
}

export function useCreateDepartmentGroupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.Employee.DepartmentGroupForm) =>
      await createDepartmentGroup(data),

    onSuccess(data) {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDepartmentGroupQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getDepartmentGroup(id);
      if (!data) return undefined;

      return {
        departmentGroupTypeId: data.departmentGroupTypeId,
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateDepartmentGroupMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.Employee.DepartmentGroupForm) =>
      await updateDepartmentGroup(id, data),

    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDepartmentGroupActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchDepartmentGroupStatus(data.id, data.isActive),

    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
