import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createPerformanceAppraisal,
  getPerformanceAppraisalByEmployeeId,
  updatePerformanceAppraisal,
} from './api';

export const useCreatePerformanceAppraisalMutation = () => {
  return useMutation({
    mutationFn: (
      payload: CareerAdvancement.CreatePerformanceAppraisalApplicationPayload
    ) => createPerformanceAppraisal(payload),
  });
};

export const useGetPerformanceAppraisalByEmployeeIdQuery = (
  employeeId: number
) => {
  return useQuery({
    queryKey: ['performanceAppraisal', employeeId],
    queryFn: () => getPerformanceAppraisalByEmployeeId(employeeId),
    enabled: !!employeeId,
  });
};

export const useUpdatePerformanceAppraisalMutation = () => {
  return useMutation({
    mutationFn: (
      payload: CareerAdvancement.UpdatePerformanceAppraisalApplicationPayload
    ) => updatePerformanceAppraisal(payload),
  });
};
