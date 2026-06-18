import { ApiService } from 'services';
import { FULL_ONBOARDING_URL } from './urls';

export async function createEmployeeFullRegistration(
  form: EmployeeManagement.FullOnboardingForm
) {
  const { error, data } = await ApiService.post<number>(
    FULL_ONBOARDING_URL,
    form
  );

  return !error ? data : undefined;
}
