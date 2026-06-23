import { ApiService } from 'services';
import { fullOnboardingUrl } from './urls';

export async function createFullOnboarding(
  form: EmployeeManagement.FullOnboardingForm
) {
  const { currentAddress, permanentAddress, isSameAsCurrentAddress, ...rest } =
    form;

  const payload = {
    ...rest,
    addresses: isSameAsCurrentAddress
      ? [{ ...currentAddress, addressType: 'Current' }]
      : [
          { ...currentAddress, addressType: 'Current' },
          { ...permanentAddress, addressType: 'Permanent' },
        ],
  };

  const { error, data } = await ApiService.post<number>(
    fullOnboardingUrl,
    payload
  );

  return !error ? data : undefined;
}
