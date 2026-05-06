import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCourseExamType,
  getCourseExamType,
  getCourseExamTypes,
  patchCourseExamTypeStatus,
  updateCourseExamType,
} from './api';

const QUERY_KEY = ['@master/course-exam-types'];

export function useCourseExamTypesQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCourseExamTypes,
  });
  return { data, isLoading };
}

export function useCreateCourseExamTypeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CourseMaster.CourseExamTypeForm) =>
      await createCourseExamType(data),

    onSuccess(data) {
      if (!data) {
        return;
      }
      const result =
        queryClient.getQueryData<CourseMaster.CourseExamTypeItem[]>(
          QUERY_KEY
        ) ?? [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useCourseExamTypeQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getCourseExamType(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateCourseExamTypeMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CourseMaster.CourseExamTypeForm) =>
      await updateCourseExamType(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseExamTypeItem[]>(
          QUERY_KEY
        ) ?? [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: CourseMaster.CourseExamTypeItem = {
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

export function useCourseExamTypeItemActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchCourseExamTypeStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseExamTypeItem[]>(
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
