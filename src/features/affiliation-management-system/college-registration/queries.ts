import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCollegeRegistration } from './api';

type CollegeRegistrationItem =
  AffiliationManagementSystem.CollegeApplicationFormData & {
    id: number;
    isActive: boolean;
  };

const QUERY_KEY = ['@affiliation/college-registration'];

export function useCreateCollegeRegistrationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: AffiliationManagementSystem.CollegeApplicationFormData
    ) => await createCollegeRegistration(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<CollegeRegistrationItem[]>(QUERY_KEY) ?? [];

      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}
