import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDepartmentGroupType,
  getDepartmentGroupType,
  getDepartmentGroupTypes,
  patchDepartmentGroupTypeStatus,
  updateDepartmentGroupType,
} from './api';

const QUERY_KEY = ['@master/department-group-type'];

export function useDepartmentGroupTypesQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getDepartmentGroupTypes,
  });

  return { data, isLoading };
}

export function useGetDepartmentGroupTypeByIdQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getDepartmentGroupType(id);

      if (!data) return undefined;

      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useCreateDepartmentGroupTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.Employee.DepartmentGroupTypeForm) =>
      await createDepartmentGroupType(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<Master.Employee.DepartmentGroupTypeItem[]>(
          QUERY_KEY
        ) ?? [];

      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useUpdateDepartmentGroupTypeMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.Employee.DepartmentGroupTypeForm) =>
      await updateDepartmentGroupType(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Employee.DepartmentGroupTypeItem[]>(
          QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === id);

      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: Master.Employee.DepartmentGroupTypeItem = {
        id: id,
        name: formData.name,
        code: formData.code,
        isActive: existing?.isActive,
      };

      const updatedItems = [
        ...result.slice(0, index),
        itemToReplace,
        ...result.slice(index + 1),
      ];

      queryClient.setQueryData(QUERY_KEY, updatedItems);

      queryClient.setQueryData([...QUERY_KEY, id], formData);
    },
  });
}

export function useDepartmentGroupTypeStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchDepartmentGroupTypeStatus(data.id, data.isActive),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Employee.DepartmentGroupTypeItem[]>(
          QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === variables.id);

      if (index === -1) return;

      const updatedItem = {
        ...result[index],
        isActive: variables.isActive,
      };

      queryClient.setQueryData(QUERY_KEY, [
        ...result.slice(0, index),
        updatedItem,
        ...result.slice(index + 1),
      ]);
    },
  });
}
