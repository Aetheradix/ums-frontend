import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createFullOnboarding,
  getFullOnboarding,
  updateFullOnboarding,
} from './api';

const queryKey = ['@employees/full-onboarding'];

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

export function useGetFullOnboardingQuery(id: number) {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: async () => await getFullOnboarding(id),
    enabled: !!id,
  });
}

export function useUpdateFullOnboardingMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeeManagement.FullOnboardingForm) =>
      await updateFullOnboarding(id, data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: [...queryKey, id],
      });
    },
  });
}
