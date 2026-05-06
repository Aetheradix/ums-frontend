import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCourseModeOfEducation,
  getCourseModeOfEducation,
  getCourseModeOfEducations,
  patchCourseModeOfEducationStatus,
  updateCourseModeOfEducation,
} from './api';

const QUERY_KEY = ['@master/course-mode-of-educations'];

export function useCourseModeOfEducationsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCourseModeOfEducations,
  });
  return { data, isLoading };
}

export function useCreateCourseModeOfEducationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CourseMaster.CourseModeOfEducationForm) =>
      await createCourseModeOfEducation(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<CourseMaster.CourseModeOfEducationItem[]>(
          QUERY_KEY
        ) ?? [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useCourseModeOfEducationQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getCourseModeOfEducation(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateCourseModeOfEducationMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CourseMaster.CourseModeOfEducationForm) =>
      await updateCourseModeOfEducation(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseModeOfEducationItem[]>(
          QUERY_KEY
        ) ?? [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: CourseMaster.CourseModeOfEducationItem = {
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

export function useCourseModeOfEducationActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchCourseModeOfEducationStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseModeOfEducationItem[]>(
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
