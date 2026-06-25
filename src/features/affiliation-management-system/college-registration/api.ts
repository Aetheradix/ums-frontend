import { ApiService } from 'services';
import { formatDatesInPayload } from 'shared/utils/dateUtils';

const COLLEGE_REGISTRATION_URL = `college-affiliation/registration`;

export async function getCollegeRegistrations() {
  return ApiService.getList<AffiliationManagementSystem.CollegeRegistrationListItem>(
    COLLEGE_REGISTRATION_URL
  );
}

export async function getCollegesByCollegeType(collegeTypeId: number) {
  const { data } = await ApiService.get<
    { registrationId: number; collegeName: string; collegeTypeId: number }[]
  >(`${COLLEGE_REGISTRATION_URL}/college-type/${collegeTypeId}`);
  return data;
}

function buildApiPayload(
  form: AffiliationManagementSystem.CollegeApplicationFormData,
  documentIds: { documentId: string; documentType: string }[]
) {
  const facilityIds = Object.entries(form.availableFacilities ?? {})
    .filter(([id, checked]) => checked && Number(id) !== -1)
    .map(([id]) => Number(id));

  const otherFacilitiesText =
    form.availableFacilities?.[-1] && form.otherFacilities
      ? form.otherFacilities
          .map(f => f.facilityName)
          .filter(Boolean)
          .join(', ')
      : null;

  const coursesApiPayload = (form.courses ?? []).map(course => ({
    courseId: course.courseId,
    subjectIds: course.subjectIds,
    totalAmount: course.totalAmount ?? 0,
    isFeePaid: course.isFeePaid ?? false,
    paymentDate: course.paymentDate || null,
  }));

  const calculatedTotalFees = coursesApiPayload.reduce(
    (acc, course) => acc + course.totalAmount,
    0
  );

  return {
    establishmentYear: form.establishmentYear as number,
    collegeCode: form.collegeCode,
    collegeName: form.collegeName,
    collegeAddress: form.collegeAddress,
    districtId: form.districtId,
    telephoneNo: form.telephoneNo,
    collegeEmail: form.collegeEmail,
    collegeCategoryId: form.collegeCategoryId,
    collegeTypeId: form.collegeTypeId,
    accommodationType: form.accommodationType,
    collegeArea: form.collegeArea,
    availableFacilities: facilityIds,
    availableFacilitiesOther: otherFacilitiesText,
    applicationNumber: form.applicationNumber,
    isSubmitted: form.isSubmitted ?? false,
    transactionId: form.transactionId || null,
    transactionDate: form.transactionDate || null,
    totalFees: form.totalFees || calculatedTotalFees,
    feeStructure: form.feeStructure || null,
    isFeePaid: form.isFeePaid ?? false,

    affiliation: {
      principalDirectorName: form.principalDirectorName,
      principalMobileNo: form.principalMobileNo,
      principalEmail: form.principalEmail,
      societyName: form.societyName,
      secretaryName: form.secretaryName,
      societyRegistrationNo: form.societyRegistrationNo,
      societyRegistrationDate: form.societyRegistrationDate,
      isOtherInstitutionRunning: form.isOtherInstitutionRunning ?? false,
    },

    courses: coursesApiPayload,

    documents: documentIds,
  };
}

export async function createCollegeRegistration(
  form: AffiliationManagementSystem.CollegeApplicationFormData,
  documentIds: { documentId: string; documentType: string }[]
) {
  const payload = buildApiPayload(form, documentIds);
  const formattedPayload = formatDatesInPayload(payload);

  const { error, data } = await ApiService.post<{
    registrationId: number;
    paymentTransactionId: number;
    applicationNumber: string;
  }>(COLLEGE_REGISTRATION_URL, formattedPayload);

  return !error ? data : undefined;
}

export async function updateCollegeRegistration(
  id: number,
  form: AffiliationManagementSystem.CollegeApplicationFormData,
  documentIds: { documentId: string; documentType: string }[]
) {
  const payload = buildApiPayload(form, documentIds);
  const formattedPayload = formatDatesInPayload(payload);

  const { error, data } = await ApiService.put<{
    registrationId: number;
    paymentTransactionId: number;
    applicationNumber: string;
  }>(`${COLLEGE_REGISTRATION_URL}/${id}`, formattedPayload);

  return !error ? data : undefined;
}

export async function uploadCollegeDocuments(
  nocFile: File | null,
  affidavitFile: File | null,
  regularAuthorityFile: File | null
) {
  const formData = new FormData();
  if (nocFile) formData.append('NocFile', nocFile);
  if (affidavitFile) formData.append('AffidavitFile', affidavitFile);
  if (regularAuthorityFile)
    formData.append('RegularAuthorityFile', regularAuthorityFile);

  const { error, data } = await ApiService.postFormData<
    { documentId: string; documentType: string }[]
  >(`${COLLEGE_REGISTRATION_URL}/upload-documents`, formData);

  return !error && data ? data : [];
}

export async function uploadBulkCollegeRegistration(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return ApiService.postFormData<{ message: string; errors?: string[] }>(
    `${COLLEGE_REGISTRATION_URL}/bulk-upload`,
    formData
  );
}
