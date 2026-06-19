import { ApiService } from 'services';
import { formatDatesInPayload } from 'shared/utils/dateUtils';

const COLLEGE_PROFILE_URL = `college-affiliation/profile`;

function buildApiPayload(
  form: AffiliationManagementSystem.CollegeProfileWizardData
) {
  return {
    applicationNo: form.applicationNo,
    modeOfAffiliation: form.modeOfAffiliation,
    nameOfCollegeSociety: form.nameOfCollegeSociety,
    collegeStatus: form.collegeStatus,
    formFee: Number(form.formFee),

    nocDetails: (form.nocDetails ?? []).map(noc => ({
      nocStatus: noc.nocStatus,
      nocTypeId: Number(noc.nocTypeId),
      nocReferenceNo: noc.nocReferenceNo,
      issueDate: noc.issueDate,
    })),

    infrastructure: {
      totalLandAreaOwned: form.totalLandAreaOwned,
      buildingOwnershipStatus: form.buildingOwnershipStatus,
      totalNumberOfBuildings: Number(form.totalNumberOfBuildings || 0),
      physicalEducationFacility: form.physicalEducationFacility,
      hostelFacilityAvailable: form.hostelFacilityAvailable,
      staffQuarterDetails: form.staffQuarterDetails,
      boysHostelsCount:
        form.hostelFacilityAvailable === 'Yes'
          ? Number(form.boysHostelsCount || 0)
          : null,
      girlsHostelsCount:
        form.hostelFacilityAvailable === 'Yes'
          ? Number(form.girlsHostelsCount || 0)
          : null,
      totalCapacity:
        form.hostelFacilityAvailable === 'Yes'
          ? Number(form.totalCapacity || 0)
          : null,
    },

    amenity: {
      teachingFacultyDetails: form.teachingFacultyDetails,
      nonTeachingAdminStaff: form.nonTeachingAdminStaff,
      coreFacilitiesForStudents: form.coreFacilitiesForStudents,
    },

    proposedPrograms: (form.proposedPrograms ?? []).map(prog => ({
      programmeType: prog.programmeType,
      regulatoryModelId: Number(prog.regulatoryModelId),
      courseLevelId: Number(prog.courseLevelId),
      facultyDeptId: Number(prog.facultyDeptId),
      programmeName: prog.programmeName,
      durationYears: prog.durationYears || null,
      appliedYear: prog.appliedYear || null,
    })),

    existingPrograms: (form.existingPrograms ?? []).map(prog => ({
      regulatoryMode: prog.regulatoryMode,
      courseLevel: prog.courseLevel,
      facultyDeptId: Number(prog.facultyDeptId),
      programmeName: prog.programmeName,
      durationYears: prog.durationYears,
      appliedYear: prog.appliedYear,
    })),

    documents: (form.documents ?? [])
      .filter(doc => doc.documentId)
      .map(doc => ({
        documentId: doc.documentId,
        documentType: doc.documentType,
      })),
  };
}

export async function saveCollegeProfile(
  form: AffiliationManagementSystem.CollegeProfileWizardData
) {
  const payload = buildApiPayload(form);
  const formattedPayload = formatDatesInPayload(payload);

  const { error, data } = await ApiService.post<{ value: string }>(
    COLLEGE_PROFILE_URL,
    formattedPayload
  );

  return !error ? data : undefined;
}

export async function getCollegeProfile(applicationNo: string) {
  const { error, data } =
    await ApiService.get<AffiliationManagementSystem.CollegeProfileWizardData>(
      `${COLLEGE_PROFILE_URL}/${applicationNo}`
    );

  return !error ? data : undefined;
}

export async function uploadCollegeProfileDocuments(files: File[]) {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach(file => {
    formData.append('Files', file);
  });

  const { error, data } = await ApiService.postFormData<
    { documentId: string; documentName: string }[]
  >(`${COLLEGE_PROFILE_URL}/upload-documents`, formData);

  return !error && data ? data : [];
}
