import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployeeRegistration } from './api';

const QUERY_KEY = ['@employees'];

export function useCreateEmployeeRegistrationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeeManagement.QuickOnboardingForm) =>
      await createEmployeeRegistration(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}
