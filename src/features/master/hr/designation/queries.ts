import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDesignation,
  getDesignation,
  getDesignations,
  getDesignationsByEmployeeType,
  deleteDesignation,
  updateDesignation,
  patchDesignationStatus,
} from './api';

const QUERY_KEY = ['@master/designation'];

export function useDesignationsQuery() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getDesignations,
  });

  return { data, isLoading, refetch };
}

export function useDesignationsByEmployeeTypeQuery(employeeType?: string) {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [...QUERY_KEY, 'by-employee-type', employeeType],
    queryFn: () => getDesignationsByEmployeeType(employeeType!),
    enabled: !!employeeType,
  });

  return { data, isLoading, refetch };
}

export function useCreateDesignationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.HR.DesignationForm) =>
      await createDesignation(data),

    onSuccess(data) {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDesignationQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getDesignation(id);
      if (!data) return undefined;

      return {
        classId: data.classId,
        postId: data.postId,
        designationTypeId: data.designationTypeId,
        name: data.name,
        code: data.code,
        sequenceNumber: data.sequenceNumber,
        employeeType: data.employeeType,
      };
    },
  });
}

export function useUpdateDesignationMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.HR.DesignationForm) =>
      await updateDesignation(id, data),

    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteDesignationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteDesignation(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.HR.DesignationItem[]>(QUERY_KEY) ?? [];

      const updatedItems = result.filter(item => item.id !== id);

      queryClient.setQueryData(QUERY_KEY, updatedItems);
    },
  });
}

export function useDesignationActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchDesignationStatus(data.id),

    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
