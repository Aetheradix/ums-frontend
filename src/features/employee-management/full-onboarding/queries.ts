import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployeeFullRegistration } from './api';

const QUERY_KEY = ['@employees'];

export function useCreateEmployeeFullRegistrationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeeManagement.FullOnboardingForm) =>
      await createEmployeeFullRegistration(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}
