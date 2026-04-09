import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSubjectCategory,
  getSubjectCategories,
  getSubjectCategory,
  patchSubjectCategoryStatus,
  updateSubjectCategory,
} from './api';

const QUERY_KEY = ['@master/subject-category'];

export function useSubjectCategoriesQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getSubjectCategories,
  });

  return { data, isLoading };
}

export function useCreateSubjectCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CourseMaster.SubjectCategoryCourseForm) =>
      await createSubjectCategory(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<CourseMaster.SubjectCategoryItem[]>(
          QUERY_KEY
        ) ?? [];

      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useSubjectCategoryQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getSubjectCategory(id);
      if (!data) return undefined;

      return {
        categoryName: data.categoryName,
        categoryNameHindi: data.categoryNameHindi,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateSubjectCategoryMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CourseMaster.SubjectCategoryCourseForm) =>
      await updateSubjectCategory(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.SubjectCategoryItem[]>(
          QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: CourseMaster.SubjectCategoryItem = {
        id,
        categoryName: formData.categoryName,
        categoryNameHindi: formData.categoryNameHindi,
        code: formData.categoryCode,
        isActive: existing?.isActive || formData.isActive,
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

export function useSubjectCategoryActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchSubjectCategoryStatus(data.id, data.isActive),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.SubjectCategoryItem[]>(
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
