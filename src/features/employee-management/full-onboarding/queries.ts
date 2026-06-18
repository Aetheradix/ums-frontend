import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFullOnboarding, getAllFullOnboarding } from './api';

const queryKey = ['@employees/full-onboarding'];

export function useGetAllFullOnboardingQuery() {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => await getAllFullOnboarding(),
  });
}

export function useCreateFullOnboardingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeeManagement.FullOnboardingForm) =>
      await createFullOnboarding(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
}
