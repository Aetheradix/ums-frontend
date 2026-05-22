import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createGrievanceCategory,
  deleteGrievanceCategory,
  getGrievanceCategories,
  getGrievanceCategory,
  patchGrievanceCategoryStatus,
  updateGrievanceCategory,
} from './api';

const QUERY_KEY = ['@master/categories'];

export function useGrievanceCategoriesQuery() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getGrievanceCategories,
  });

  return { data, isLoading, refetch };
}

export function useCreateGrievanceCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Grievance.GrievanceCategoryForm) =>
      await createGrievanceCategory(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<Grievance.GrievanceCategoryItem[]>(
          QUERY_KEY
        ) ?? [];

      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useGrievanceCategoryQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getGrievanceCategory(id);
      if (!data) return undefined;

      return {
        name: data.name,
        categoryType: data.categoryType,
        code: data.code,
      };
    },
  });
}

export function useUpdateGrievanceCategoryMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Grievance.GrievanceCategoryForm) =>
      await updateGrievanceCategory(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Grievance.GrievanceCategoryItem[]>(
          QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: Grievance.GrievanceCategoryItem = {
        id,
        name: formData.name,
        code: formData.code,
        categoryType: formData.categoryType,
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

export function useDeleteGrievanceCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteGrievanceCategory(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Grievance.GrievanceCategoryItem[]>(
          QUERY_KEY
        ) ?? [];

      const updatedItems = result.filter(item => item.id !== id);

      queryClient.setQueryData(QUERY_KEY, updatedItems);
    },
  });
}

export function useGrievanceCategoryActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchGrievanceCategoryStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Grievance.GrievanceCategoryItem[]>(
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
