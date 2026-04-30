import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDivision,
  deleteDivision,
  getDivision,
  getDivisions,
  updateDivision,
} from './api';

const QUERY_KEY = ['@master/division'];

export function useDivisionsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getDivisions,
  });
  return { data, isLoading };
}

export function useCreateDivisionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.DivisionForm) => await createDivision(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<Master.DivisionItem[]>(QUERY_KEY) ?? [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useDivisionQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getDivision(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        stateId: data.stateId,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateDivisionMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.DivisionForm) =>
      await updateDivision(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.DivisionItem[]>(QUERY_KEY) ?? [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: Master.DivisionItem = {
        id,
        name: formData.name,
        code: formData.code,
        stateId: formData.stateId,
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

export function useDeleteDivisionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteDivision(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.DivisionItem[]>(QUERY_KEY) ?? [];
      queryClient.setQueryData(
        QUERY_KEY,
        result.filter(item => item.id !== id)
      );
    },
  });
}
