import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAcademicYear,
  getAcademicYear,
  getAcademicYears,
  patchAcademicYearStatus,
  updateAcademicYear,
} from './api';

const QUERY_KEY = ['@master/academic-year'];

export function useAcademicYearsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getAcademicYears,
  });
  return { data, isLoading };
}

export function useCreateAcademicYearMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.AcademicYearForm) =>
      await createAcademicYear(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<Master.AcademicYearItem[]>(QUERY_KEY) ?? [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useAcademicYearQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getAcademicYear(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
    enabled: !!id,
  });
}

export function useUpdateAcademicYearMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.AcademicYearForm) =>
      await updateAcademicYear(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.AcademicYearItem[]>(QUERY_KEY) ?? [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: Master.AcademicYearItem = {
        id,
        name: formData.name,
        code: formData.code,
        isActive: existing?.isActive || formData.isActive,
      };

      queryClient.setQueryData(QUERY_KEY, [
        ...result.slice(0, index),
        itemToReplace,
        ...result.slice(index + 1),
      ]);
      queryClient.setQueryData([...QUERY_KEY, id], formData);
    },
  });
}

export function useAcademicYearActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchAcademicYearStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.AcademicYearItem[]>(QUERY_KEY) ?? [];

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
