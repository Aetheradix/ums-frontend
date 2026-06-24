import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createNocType,
  getNocType,
  getNocTypes,
  deleteNocType,
  updateNocType,
  patchNocTypeStatus,
} from './api';

const QUERY_KEY = ['@master/noc-type'];

export function useNocTypesQuery() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getNocTypes,
  });

  return { data, isLoading, refetch };
}

export function useCreateNocTypeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CollegeMaster.NocTypeForm) =>
      await createNocType(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<CollegeMaster.NocTypeItem[]>(QUERY_KEY) ?? [];

      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useNocTypeQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getNocType(id);
      if (!data) return undefined;

      return {
        nocTypeName: data.name,
      };
    },
  });
}

export function useUpdateNocTypeMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CollegeMaster.NocTypeForm) =>
      await updateNocType(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CollegeMaster.NocTypeItem[]>(QUERY_KEY) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: CollegeMaster.NocTypeItem = {
        id,
        nocTypeName: formData.nocTypeName,
        name: formData.nocTypeName,
        isActive: existing?.isActive ?? true,
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

export function useDeleteNocTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteNocType(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CollegeMaster.NocTypeItem[]>(QUERY_KEY) ?? [];

      const updatedItems = result.filter(item => item.id !== id);

      queryClient.setQueryData(QUERY_KEY, updatedItems);
    },
  });
}

export function useNocTypeActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchNocTypeStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CollegeMaster.NocTypeItem[]>(QUERY_KEY) ?? [];

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
