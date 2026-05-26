import { ApiService } from 'services';
import { PERFORMANCE_APPRAISAL_API_URLS } from './urls';

export const createPerformanceAppraisal = async (
  payload: CareerAdvancement.CreatePerformanceAppraisalApplicationPayload
): Promise<number> => {
  const { data, error } = await ApiService.post<number>(
    PERFORMANCE_APPRAISAL_API_URLS.BASE,
    payload
  );
  if (error) {
    throw new Error('Failed to create performance appraisal application');
  }
  return data as number;
};
