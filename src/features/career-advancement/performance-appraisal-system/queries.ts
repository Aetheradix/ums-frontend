import { useMutation } from '@tanstack/react-query';
import { createPerformanceAppraisal } from './api';

export const useCreatePerformanceAppraisalMutation = () => {
  return useMutation({
    mutationFn: (
      payload: CareerAdvancement.CreatePerformanceAppraisalApplicationPayload
    ) => createPerformanceAppraisal(payload),
  });
};
