import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

export const STEP_FIELDS: Record<
  number,
  (keyof AffiliationManagementSystem.CollegeProfileWizardData)[]
> = {
  0: [
    'applicationNo',
    'modeOfAffiliation',
    'nameOfCollegeSociety',
    'collegeStatus',
    'nocDetails',
  ],
  1: [
    'totalLandAreaOwned',
    'buildingOwnershipStatus',
    'totalNumberOfBuildings',
    'physicalEducationFacility',
    'hostelFacilityAvailable',
    'staffQuarterDetails',
    'boysHostelsCount',
    'girlsHostelsCount',
    'totalCapacity',
  ],
  2: [
    'proposedPrograms',
    'existingPrograms',
    'teachingFacultyDetails',
    'nonTeachingAdminStaff',
    'coreFacilitiesForStudents',
  ],
};

const schema =
  validation.create<AffiliationManagementSystem.CollegeProfileWizardData>(
    o => ({
      // Step 1 - Institutional & NOC Details
      applicationNo: o.string().required().max(50),
      modeOfAffiliation: o.string().required().max(100),
      nameOfCollegeSociety: o
        .string()
        .required()
        .max(300)
        .pattern(expressions.englishOnly)
        .messages({
          [keys.string.pattern]: 'Name of College/Society must be in English',
        }),
      collegeStatus: o.string().required().max(50),
      formFee: o.any().optional(),

      nocDetails: o
        .array()
        .items(
          o.object().keys({
            nocStatus: o.string().required().max(50),
            nocTypeId: o.number().required(),
            nocReferenceNo: o.string().required().max(100),
            issueDate: o.date().required(),
          })
        )
        .optional(),

      // Step 2 - Physical Infrastructure
      totalLandAreaOwned: o.string().required().max(255),
      buildingOwnershipStatus: o.string().required().max(100),
      totalNumberOfBuildings: o.string().required().max(50),
      physicalEducationFacility: o.string().required().max(500),
      hostelFacilityAvailable: o.string().required().max(10),
      staffQuarterDetails: o.string().required().max(500),
      boysHostelsCount: o.number().integer().allow(null, '').optional(),
      girlsHostelsCount: o.number().integer().allow(null, '').optional(),
      totalCapacity: o.number().integer().allow(null, '').optional(),

      // Step 3 - Ecosystem & Academic Programmes
      proposedPrograms: o
        .array()
        .items(
          o.object().keys({
            programmeType: o.string().required().max(100),
            regulatoryModelId: o.number().required(),
            courseLevelId: o.number().required(),
            facultyDeptId: o.number().required(),
            programmeName: o.string().required().max(200),
            durationYears: o.string().allow('', null).optional(),
            appliedYear: o.string().allow('', null).optional(),
          })
        )
        .optional(),

      existingPrograms: o
        .array()
        .items(
          o.object().keys({
            regulatoryMode: o.string().required().max(100),
            courseLevel: o.string().required().max(100),
            facultyDeptId: o.number().required(),
            programmeName: o.string().required().max(200),
            durationYears: o.string().required().max(50),
            appliedYear: o.string().required().max(50),
          })
        )
        .optional(),

      teachingFacultyDetails: o.string().required().max(1000),
      nonTeachingAdminStaff: o.string().required().max(1000),
      coreFacilitiesForStudents: o.string().required().max(2000),
    })
  );

export function useCollegeProfileWizardForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState,
  } = useAppForm<AffiliationManagementSystem.CollegeProfileWizardData>({
    resolver: validation.resolver(schema),
    mode: 'onChange',
    defaultValues: {
      nocDetails: [],
      proposedPrograms: [],
      existingPrograms: [],
      hostelFacilityAvailable: 'No',
      formFee: 5000,
    },
  });

  return {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    formState,
  };
}
