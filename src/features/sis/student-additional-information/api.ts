import { ApiService } from 'services';

const SIS_API_ROOT = `student/`;
const STUDENT_ADDITIONAL_INFORMATION_URL = `${SIS_API_ROOT}student-additional-information`;

export function getStudentAdditionalInformations() {
  return ApiService.getList<SIS.StudentAdditionalInformationItem>(
    STUDENT_ADDITIONAL_INFORMATION_URL
  );
}

export async function getStudentAdditionalInformation(id: number) {
  const { data } = await ApiService.get<SIS.StudentAdditionalInformationItem>(
    `${STUDENT_ADDITIONAL_INFORMATION_URL}/${id}`
  );
  return data;
}

export async function createStudentAdditionalInformation(
  form: SIS.StudentAdditionalInformationForm
) {
  const formData = new FormData();

  // Explicitly mapping to match Backend PascalCase Property Names for clarity and safety
  formData.append('StudentId', form.studentId.toString());
  formData.append('StudentAcademicId', form.studentAcademicId.toString());
  formData.append('DocumentType', form.documentType);
  formData.append('EmergencyContactName', form.emergencyContactName);
  formData.append('EmergencyContact', form.emergencyContact);
  formData.append('EmergencyRelation', form.emergencyRelation);
  formData.append('EmailNotification', form.emailNotification.toString());
  formData.append('SMSNotification', form.smsNotification.toString());
  formData.append('PushNotification', form.pushNotification.toString());

  if (form.languagePreferance) {
    formData.append('LanguagePreferance', form.languagePreferance);
  }

  if (form.profilePhoto) {
    formData.append('ProfilePhoto', form.profilePhoto);
  }

  const { error, data } =
    await ApiService.postFormData<SIS.StudentAdditionalInformationItem>(
      STUDENT_ADDITIONAL_INFORMATION_URL,
      formData
    );

  return !error ? data : undefined;
}

export async function updateStudentAdditionalInformation(
  id: number,
  form: SIS.StudentAdditionalInformationForm
): Promise<boolean> {
  const formData = new FormData();

  // Map same as create if update endpoint exists on backend
  Object.entries(form).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      // Capitalize first letter to match PascalCase
      const pascalKey = key.charAt(0).toUpperCase() + key.slice(1);
      formData.append(pascalKey, value instanceof File ? value : String(value));
    }
  });

  const result = await ApiService.putFormData(
    `${STUDENT_ADDITIONAL_INFORMATION_URL}/${id}`,
    formData
  );

  return !result.error;
}
