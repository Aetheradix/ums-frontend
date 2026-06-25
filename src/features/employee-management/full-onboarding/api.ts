import { ApiService } from 'services';
import { fullOnboardingUrl } from './urls';

export async function createFullOnboarding(
  form: EmployeeManagement.FullOnboardingForm
) {
  const { currentAddress, permanentAddress, isSameAsCurrentAddress, ...rest } =
    form;

  const payload = {
    ...rest,
    addresses: [{ ...currentAddress, addressType: 'Current' }],
  };

  const { error, data } = await ApiService.post<number>(
    fullOnboardingUrl,
    payload
  );

  return !error ? data : undefined;
}

export async function getFullOnboarding(id: number) {
  const { error, data } = await ApiService.get<any>(
    `employees/${id}/full-onboarding`
  );

  if (!error && data) {
    const currentAddress = data.addresses?.find(
      (a: any) => a.addressType === 'Current'
    ) || { addressType: 'Current' };

    const mappedData: EmployeeManagement.FullOnboardingForm = {
      ...data,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      dateOfJoining: data.dateOfJoining
        ? new Date(data.dateOfJoining)
        : undefined,
      passportValidity: data.passportValidity
        ? new Date(data.passportValidity)
        : undefined,
      dateOfSuperannuation: data.dateOfSuperannuation
        ? new Date(data.dateOfSuperannuation)
        : undefined,
      currentAddress,
      qualifications:
        data.qualifications?.length > 0
          ? data.qualifications
          : [
              {
                qualificationId: 0,
                university: '',
                board: '',
                yearOfPassing: 0,
                percentage: 0,
                grade: '',
              },
            ],
    };

    return mappedData;
  }

  return undefined;
}

export async function updateFullOnboarding(
  id: number,
  form: EmployeeManagement.FullOnboardingForm
) {
  const { currentAddress, permanentAddress, isSameAsCurrentAddress, ...rest } =
    form;

  const payload = {
    ...rest,
    addresses: [{ ...currentAddress, addressType: 'Current' }],
  };

  const { error, data } = await ApiService.put<number>(
    `employees/${id}/full-onboarding`,
    payload
  );

  return !error ? data : undefined;
}
