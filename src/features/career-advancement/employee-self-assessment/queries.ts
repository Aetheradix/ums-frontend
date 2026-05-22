import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEmployeeSelfAssessment,
  getEmployeeSelfAssessmentById,
  updateEmployeeSelfAssessment,
} from './api';

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

export function useEmployeeSelfAssessmentQuery(employeeId: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, employeeId],
    queryFn: async () => {
      const data = await getEmployeeSelfAssessmentById(employeeId);
      if (data) {
        // The API returns strings for dates, but our form uses Date objects
        data.assessmentYear = data.assessmentYear
          ? new Date(data.assessmentYear)
          : null;
        data.assessmentPeriodFrom = data.assessmentPeriodFrom
          ? new Date(data.assessmentPeriodFrom)
          : null;
        data.assessmentPeriodTo = data.assessmentPeriodTo
          ? new Date(data.assessmentPeriodTo)
          : null;
      }
      return data;
    },
    enabled: !!employeeId, // Only run if employeeId is provided
  });
}

export function useUpdateEmployeeSelfAssessmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CareerAdvancement.EmployeeSelfAssessmentForm) =>
      await updateEmployeeSelfAssessment(data),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY, variables.employeeId],
      });
    },
  });
}
