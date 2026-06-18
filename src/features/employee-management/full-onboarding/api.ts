import { ApiService } from 'services';
import { fullOnboardingUrl } from './urls';

export async function createFullOnboarding(
  form: EmployeeManagement.FullOnboardingForm
) {
  const { error, data } = await ApiService.post<number>(
    fullOnboardingUrl,
    form
  );

  return !error ? data : undefined;
}

export async function getAllFullOnboarding() {
  const { error, data } =
    await ApiService.get<EmployeeManagement.FullOnboardingItem[]>(
      fullOnboardingUrl
    );

  return !error ? data : [];
}
