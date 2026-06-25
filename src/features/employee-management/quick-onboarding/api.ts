import { ApiService } from 'services';
import { quickOnboardingUrl } from './urls';

export async function createQuickOnboarding(
  form: EmployeeManagement.QuickOnboardingForm
) {
  const { error, data } = await ApiService.post<number>(
    quickOnboardingUrl,
    form
  );

  return !error ? data : undefined;
}

export async function getQuickOnboarding(id: number) {
  const { error, data } =
    await ApiService.get<EmployeeManagement.QuickOnboardingForm>(
      `employees/${id}/quick-onboarding`
    );

  return !error ? data : undefined;
}

export async function updateQuickOnboarding(
  id: number,
  form: EmployeeManagement.QuickOnboardingForm
) {
  const { error, data } =
    await ApiService.put<EmployeeManagement.QuickOnboardingForm>(
      `employees/${id}/quick-onboarding`,
      form
    );

  return !error ? data : undefined;
}
