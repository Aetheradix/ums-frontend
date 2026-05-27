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

export const getPerformanceAppraisalByEmployeeId = async (
  employeeId: number
): Promise<CareerAdvancement.PerformanceAppraisalApplicationDto | null> => {
  const { data, error } =
    await ApiService.get<CareerAdvancement.PerformanceAppraisalApplicationDto>(
      `${PERFORMANCE_APPRAISAL_API_URLS.BASE}/${employeeId}`
    );
  if (error) {
    return null;
  }
  return data ?? null;
};

export const updatePerformanceAppraisal = async (
  payload: CareerAdvancement.UpdatePerformanceAppraisalApplicationPayload
): Promise<number> => {
  const { data, error } = await ApiService.put<number>(
    `${PERFORMANCE_APPRAISAL_API_URLS.BASE}/${payload.applicationId}`,
    payload
  );
  if (error) {
    throw new Error('Failed to update performance appraisal application');
  }
  return data as number;
};
