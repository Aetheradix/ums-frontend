import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCourseLevel,
  getCourseLevel,
  getCourseLevels,
  patchCourseLevelStatus,
  updateCourseLevel,
} from './api';

const QUERY_KEY = ['@master/course-levels'];

export function useCourseLevelsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCourseLevels,
  });
  return { data, isLoading };
}

export function useCreateCourseLevelMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CourseMaster.CourseLevelForm) =>
      await createCourseLevel(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<CourseMaster.CourseLevelItem[]>(QUERY_KEY) ??
        [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useCourseLevelQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getCourseLevel(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateCourseLevelMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CourseMaster.CourseLevelForm) =>
      await updateCourseLevel(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseLevelItem[]>(QUERY_KEY) ??
        [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: CourseMaster.CourseLevelItem = {
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

export function useCourseLevelActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchCourseLevelStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseLevelItem[]>(QUERY_KEY) ??
        [];

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
