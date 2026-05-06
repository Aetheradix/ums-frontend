import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createCourseMaster,
  getCourseMaster,
  getCourseMasters,
  patchCourseMasterStatus,
  updateCourseMaster,
} from './api';

const QUERY_KEY = ['@master/course-masters'];

export function useCourseMastersQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCourseMasters,
  });
  return { data, isLoading };
}

export function useCreateCourseMasterMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CourseMaster.CourseMasterForm) =>
      await createCourseMaster(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<CourseMaster.CourseMasterItem[]>(QUERY_KEY) ??
        [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useCourseMasterQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getCourseMaster(id);
      if (!data) return undefined;
      return {
        name: data.name,
        code: data.code,
        levelId: data.levelId,
        departmentId: data.departmentId,
        streamId: data.streamId,
        modeId: data.modeId,
        tenureId: data.tenureId,
        examTypeId: data.examTypeId,
        totalTerms: data.totalTerms,
        description: data.description,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateCourseMasterMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CourseMaster.CourseMasterForm) =>
      await updateCourseMaster(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseMasterItem[]>(QUERY_KEY) ??
        [];
      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];
      const itemToReplace: CourseMaster.CourseMasterItem = {
        id,
        name: formData.name,
        code: formData.code,
        levelId: formData.levelId,
        departmentId: formData.departmentId,
        streamId: formData.streamId,
        modeId: formData.modeId,
        tenureId: formData.tenureId,
        examTypeId: formData.examTypeId,
        totalTerms: formData.totalTerms,
        description: formData.description,
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

export function useCourseMasterActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchCourseMasterStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<CourseMaster.CourseMasterItem[]>(QUERY_KEY) ??
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
