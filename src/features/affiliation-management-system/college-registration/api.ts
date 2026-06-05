import { ApiService } from 'services';
import { formatDatesInPayload } from 'shared/utils/dateUtils';

const COLLEGE_REGISTRATION_URL = `college-affiliation/registration`;

/**
 * Transforms the frontend form data into the API payload structure
 * that matches the backend CreateCollegeRegistrationCommand.
 */
function buildApiPayload(
  form: AffiliationManagementSystem.CollegeApplicationFormData,
  documentIds: { documentId: string; documentType: string }[]
) {
  // Extract the first checked facility id as AvailableFacilitiesId
  const facilityIds = Object.entries(form.availableFacilities ?? {})
    .filter(([, checked]) => checked)
    .map(([id]) => Number(id));

  return {
    // College Registration fields
    establishmentYearId: form.establishmentYearId,
    collegeName: form.collegeName,
    collegeAddress: form.collegeAddress,
    stateId: form.stateId ?? 0,
    districtId: form.districtId,
    telephoneNo: form.telephoneNo,
    collegeEmail: form.collegeEmail,
    collegeCategory: form.collegeCategory,
    collegeType: form.collegeType,
    accommodationType: form.accommodationType,
    collegeArea: form.collegeArea,
    availableFacilitiesId: facilityIds[0] ?? 0,
    numberOfClassRooms: form.numberOfClassRooms,
    deficiencyEarlierRaisedByCommittee:
      form.deficiencyEarlierRaisedByCommittee === 'Yes',
    deficiencyStatus: form.deficiencyStatus ?? null,
    deficiencyReason: form.deficiencyReason ?? null,

    // Affiliation details (nested)
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

    // Course details
    courses: (form.courses ?? []).map(course => ({
      programmeFeesMappingId: course.programmeFeesMappingId,
      totalAmount: course.totalAmount ?? 0,
      isFeePaid: course.isFeePaid ?? false,
      paymentDate: course.paymentDate || null,
    })),

    // Documents
    documents: documentIds,
  };
}

export async function createCollegeRegistration(
  form: AffiliationManagementSystem.CollegeApplicationFormData,
  documentIds: { documentId: string; documentType: string }[]
) {
  const payload = buildApiPayload(form, documentIds);
  const formattedPayload = formatDatesInPayload(payload);

  const { error, data } = await ApiService.post<{ value: number }>(
    COLLEGE_REGISTRATION_URL,
    formattedPayload
  );

  return !error ? data : undefined;
}

export async function getCollegeRegistrations() {
  return ApiService.getList<AffiliationManagementSystem.CollegeRegistrationListItem>(
    COLLEGE_REGISTRATION_URL
  );
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
