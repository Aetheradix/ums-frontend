import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCourseTenure,
  getCourseTenure,
  getCourseTenures,
  patchCourseTenureStatus,
  updateCourseTenure,
} from './api';

const QUERY_KEY = ['@master/course-tenures'];

export function useCourseTenuresQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCourseTenures,
  });
  return { data, isLoading };
}

export function useCreateCourseTenureMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CourseMaster.CourseTenureForm) =>
      await createCourseTenure(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<CourseMaster.CourseTenureItem[]>(QUERY_KEY) ??
        [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useCourseTenureQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getCourseTenure(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateCourseTenureMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CourseMaster.CourseTenureForm) =>
      await updateCourseTenure(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseTenureItem[]>(QUERY_KEY) ??
        [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: CourseMaster.CourseTenureItem = {
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

export function useCourseTenureActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchCourseTenureStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseTenureItem[]>(QUERY_KEY) ??
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
