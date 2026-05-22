import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployeeSelfAssessment } from './api';

const QUERY_KEY = ['@career/employee-self-assessment'];

export function useCreateEmployeeSelfAssessmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CareerAdvancement.EmployeeSelfAssessmentForm) =>
      await createEmployeeSelfAssessment(data),

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
