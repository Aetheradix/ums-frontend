import { ApiService } from 'services';
import { PERFORMANCE_ACADEMIC_API_URLS } from './urls';

export const createAcademicDetail = async (
  payload: CareerAdvancement.CreateAcademicDetailPayload
): Promise<number> => {
  const formData = new FormData();
  formData.append('applicationId', payload.applicationId.toString());
  formData.append('qualificationId', payload.qualificationId.toString());
  formData.append('universityInstitution', payload.universityInstitution);
  formData.append('yearOfPassing', payload.yearOfPassing.toString());

  if (payload.netsetQualified !== null) {
    formData.append('netsetQualified', payload.netsetQualified.toString());
  }

  formData.append('status', payload.status);
  formData.append('isActive', payload.isActive.toString());
  formData.append('employeeId', payload.employeeId.toString());
  formData.append(
    'assessmentSessionId',
    payload.assessmentSessionId.toString()
  );
  formData.append('documentType', payload.documentType);

  if (payload.document) {
    formData.append('document', payload.document);
  }

  // Use multipart/form-data request
  const { data, error } = await ApiService.postFormData<number>(
    PERFORMANCE_ACADEMIC_API_URLS.BASE,
    formData
  );

  if (error) {
    throw new Error('Failed to create academic detail');
  }
  return data as number;
};

export const updateAcademicDetail = async (
  payload: CareerAdvancement.UpdateAcademicDetailPayload
): Promise<number> => {
  const formData = new FormData();
  formData.append('applicationId', payload.applicationId.toString());
  formData.append('qualificationId', payload.qualificationId.toString());
  formData.append('universityInstitution', payload.universityInstitution);
  formData.append('yearOfPassing', payload.yearOfPassing.toString());

  if (payload.netsetQualified !== null) {
    formData.append('netsetQualified', payload.netsetQualified.toString());
  }

  formData.append('status', payload.status);
  formData.append('isActive', payload.isActive.toString());
  formData.append('employeeId', payload.employeeId.toString());
  formData.append(
    'assessmentSessionId',
    payload.assessmentSessionId.toString()
  );
  formData.append('documentType', payload.documentType);
  formData.append('academicId', payload.academicId.toString());

  if (payload.document) {
    formData.append('document', payload.document);
  }

  const { data, error } = await ApiService.putFormData<number>(
    `${PERFORMANCE_ACADEMIC_API_URLS.BASE}/${payload.academicId}`,
    formData
  );

  if (error) {
    throw new Error('Failed to update academic detail');
  }
  return data as number;
};
