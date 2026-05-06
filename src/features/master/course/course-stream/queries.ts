import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCourseStream,
  getCourseStream,
  getCourseStreams,
  patchCourseStreamStatus,
  updateCourseStream,
} from './api';

const QUERY_KEY = ['@master/course-streams'];

export function useCourseStreamsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCourseStreams,
  });
  return { data, isLoading };
}

export function useCreateCourseStreamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CourseMaster.CourseStreamForm) =>
      await createCourseStream(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<CourseMaster.CourseStreamItem[]>(QUERY_KEY) ??
        [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useCourseStreamQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getCourseStream(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateCourseStreamMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CourseMaster.CourseStreamForm) =>
      await updateCourseStream(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseStreamItem[]>(QUERY_KEY) ??
        [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: CourseMaster.CourseStreamItem = {
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

export function useCourseStreamActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchCourseStreamStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseStreamItem[]>(QUERY_KEY) ??
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
