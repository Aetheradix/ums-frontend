import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createQuickOnboarding,
  getQuickOnboarding,
  updateQuickOnboarding,
} from './api';

const queryKey = ['@employees/quick-onboarding'];

export function useCreateQuickOnboardingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeeManagement.QuickOnboardingForm) =>
      await createQuickOnboarding(data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
}

export function useGetQuickOnboardingQuery(id: number) {
  return useQuery({
    queryKey: [...queryKey, id],
    queryFn: async () => await getQuickOnboarding(id),
    enabled: !!id,
  });
}

export function useUpdateQuickOnboardingMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EmployeeManagement.QuickOnboardingForm) =>
      await updateQuickOnboarding(id, data),

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
