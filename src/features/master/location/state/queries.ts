import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createState,
  deleteState,
  getState,
  getStates,
  updateState,
} from './api';

const QUERY_KEY = ['@master/state'];

export function useStatesQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getStates,
  });
  return { data, isLoading };
}

export function useCreateStateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.StateForm) => await createState(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<Master.StateItem[]>(QUERY_KEY) ?? [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useStateQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getState(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateStateMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.StateForm) => await updateState(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.StateItem[]>(QUERY_KEY) ?? [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: Master.StateItem = {
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

export function useDeleteStateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteState(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.StateItem[]>(QUERY_KEY) ?? [];
      queryClient.setQueryData(
        QUERY_KEY,
        result.filter(item => item.id !== id)
      );
    },
  });
}
