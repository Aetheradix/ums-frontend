import { ApiService } from 'services';
import { EMPLOYEE_REGISTRATION_URL } from './urls';

export async function createEmployeeRegistration(
  form: EmployeeManagement.QuickOnboardingForm
) {
  const { error, data } = await ApiService.post<number>(
    EMPLOYEE_REGISTRATION_URL,
    form
  );

  return !error ? data : undefined;
}
