import { ApiService } from 'services';
import { formatDatesInPayload } from 'shared/utils/dateUtils';

const API_ROOT = `affiliation-management-system/`;

const COLLEGE_REGISTRATION_URL = `${API_ROOT}college-registrations`;

export async function createCollegeRegistration(
  form: AffiliationManagementSystem.CollegeApplicationFormData
) {
  const formattedForm = formatDatesInPayload(form);
  const { error, data } = await ApiService.post<
    AffiliationManagementSystem.CollegeApplicationFormData & {
      id: number;
      isActive: boolean;
    }
  >(COLLEGE_REGISTRATION_URL, formattedForm);

  return !error ? data : undefined;
}
