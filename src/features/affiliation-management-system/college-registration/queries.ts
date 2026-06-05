import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCollegeRegistration, getCollegeRegistrations } from './api';

const QUERY_KEY = ['@affiliation/college-registration'];

export function useCollegeRegistrationsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCollegeRegistrations,
  });

  return { data, isLoading };
}

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
