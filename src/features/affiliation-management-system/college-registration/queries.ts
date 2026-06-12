import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCollegeRegistration, updateCollegeRegistration } from './api';

const QUERY_KEY = ['@affiliation/college-registration'];

export function useCreateCollegeRegistrationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      documentIds,
    }: {
      data: AffiliationManagementSystem.CollegeApplicationFormData;
      documentIds: { documentId: string; documentType: string }[];
    }) => await createCollegeRegistration(data, documentIds),

    onSuccess(data) {
      if (!data) return;

      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateCollegeRegistrationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
      documentIds,
    }: {
      id: number;
      data: AffiliationManagementSystem.CollegeApplicationFormData;
      documentIds: { documentId: string; documentType: string }[];
    }) => await updateCollegeRegistration(id, data, documentIds),

    onSuccess(data) {
      if (!data) return;

      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
