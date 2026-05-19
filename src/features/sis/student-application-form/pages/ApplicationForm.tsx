import { useCallback, useState } from 'react';
import { ToastService } from 'services';
import { FormPage, Stepper } from 'shared/new-components';
import { Button } from 'shared/components/buttons';
import { useCreateApplicationMutation } from '../queries';
import { useApplicationForm } from '../components/form.hook';
import BasicInfoStep from '../components/BasicInfoStep';
import FatherInfoStep from '../components/FatherInfoStep';
import MotherInfoStep from '../components/MotherInfoStep';
import AcademicInfoStep from '../components/AcademicInfoStep';
import AddressInfoStep from '../components/AddressInfoStep';
import type { ApplicationFormData, CreateApplicationCommand } from '../types';

// Import all required query hooks for dropdown mapping
import { useAcademicYearsQuery } from 'features/master/other/academic-year/queries';
import { useProgrammesQuery } from 'features/master/other/programme/queries';
import { useDegreeLevelsQuery } from 'features/master/other/degree-level/queries';
import { useSpecialisationsQuery } from 'features/master/other/specialisation/queries';
import { useGenderQuery } from 'features/master/other/gender/queries';
import { useResidencyStatusesQuery } from 'features/master/other/residency-status/queries';
import { useNationalitiesQuery } from 'features/master/other/nationality/queries';
import { useAddressTypeQuery } from 'features/master/other/address-type/queries';
import { useStatesQuery } from 'features/master/location/state/queries';
import { useDivisionsQuery } from 'features/master/location/division/queries';
import { useDistrictsQuery } from 'features/master/location/district/queries';
import { useTehsilsQuery } from 'features/master/location/tehsil/queries';
import { useDesignationsQuery } from 'features/master/faculty/designation/queries';
import { useOccupationTypeQuery } from 'features/master/other/occupation/queries';
import { useProgrammeModeOfEducationsQuery } from 'features/master/subject/programme-mode-of-education/queries';

const STEPS = [
  { label: 'Basic Info' },
  { label: "Father's Details" },
  { label: "Mother's Details" },
  { label: 'Academic Info' },
  { label: 'Address Info' },
];

/** Fields that belong to each step — used for per-step validation */
const STEP_FIELDS: Record<number, (keyof ApplicationFormData)[]> = {
  0: [
    'firstName',
    'lastName',
    'email',
    'phone',
    'gender',
    'caste',
    'dateOfBirth',
    'age',
    'residencyStatus',
    'ethnicity',
    'nationality',
  ],
  1: [
    'fatherName',
    'fatherOccupation',
    'fatherDesignation',
    'fatherAnnualIncome',
    'fatherContactNumber',
  ],
  2: [
    'motherName',
    'motherOccupation',
    'motherDesignation',
    'motherAnnualIncome',
    'motherContactNumber',
  ],
  3: [
    'academicSession',
    'programme',
    'degreeLevel',
    'programOfStudy',
    'specialisation',
    'previousInstitutionType',
    'previousInstitutionCgpa',
  ],
  4: [
    'addressType',
    'country',
    'state',
    'division',
    'district',
    'tehsil',
    'block',
    'addressLine1',
    'addressLine2',
    'landmark',
    'zipcode',
  ],
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Helper to lookup display text corresponding to a selected ID */
function lookupText(
  value: string | number | undefined | null,
  list: any[] | undefined,
  idField: string = 'id',
  textField: string = 'name'
): string {
  if (value === null || value === undefined) return '';
  const item = list?.find(item => String(item[idField]) === String(value));
  return item ? String(item[textField]) : String(value);
}

export default function ApplicationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const { mutateAsync, isPending } = useCreateApplicationMutation();

  // Initialize form hook at the top to avoid Temporal Dead Zone (TDZ) reference errors
  const { register, handleSubmit, reset, trigger } = useApplicationForm();

  // Load all master lists for translation of selected IDs to text labels
  const { data: academicYears } = useAcademicYearsQuery();
  const { data: programmes } = useProgrammesQuery();
  const { data: degreeLevels } = useDegreeLevelsQuery();
  const { data: specialisations } = useSpecialisationsQuery();
  const { data: genders } = useGenderQuery();
  const { data: residencyStatuses } = useResidencyStatusesQuery();
  const { data: nationalities } = useNationalitiesQuery();
  const { data: addressTypes } = useAddressTypeQuery();
  const { data: states } = useStatesQuery();
  const { data: divisions } = useDivisionsQuery();
  const { data: districts } = useDistrictsQuery();
  const { data: tehsils } = useTehsilsQuery();
  const { data: designations } = useDesignationsQuery();
  const { data: occupations } = useOccupationTypeQuery();
  const { data: programModes } = useProgrammeModeOfEducationsQuery();

  // Define Form Submission action using handleSubmit from react-hook-form
  const onFormSubmit = handleSubmit(
    async (data: ApplicationFormData) => {
      try {
        // Translate all dropdown IDs to the expected display text representations
        const resolvedSession = lookupText(
          data.academicSession,
          academicYears,
          'id',
          'session'
        );
        const resolvedProgramme = lookupText(
          data.programme,
          programmes,
          'id',
          'name'
        );
        const resolvedGender = lookupText(data.gender, genders, 'id', 'text');
        const resolvedResidency = lookupText(
          data.residencyStatus,
          residencyStatuses,
          'id',
          'text'
        );
        const resolvedNationality = lookupText(
          data.nationality,
          nationalities,
          'id',
          'name'
        );
        const resolvedDegreeLevel = lookupText(
          data.degreeLevel,
          degreeLevels,
          'id',
          'name'
        );
        const resolvedSpecialisation = lookupText(
          data.specialisation,
          specialisations,
          'id',
          'name'
        );
        const resolvedAddressType = lookupText(
          data.addressType,
          addressTypes,
          'id',
          'text'
        );
        const resolvedState = lookupText(data.state, states, 'id', 'name');
        const resolvedDivision = lookupText(
          data.division,
          divisions,
          'id',
          'name'
        );
        const resolvedDistrict = lookupText(
          data.district,
          districts,
          'id',
          'name'
        );
        const resolvedTehsil = lookupText(data.tehsil, tehsils, 'id', 'name');
        const resolvedFatherOccupation = lookupText(
          data.fatherOccupation,
          occupations,
          'id',
          'text'
        );
        const resolvedFatherDesignation = lookupText(
          data.fatherDesignation,
          designations,
          'id',
          'name'
        );
        const resolvedMotherOccupation = lookupText(
          data.motherOccupation,
          occupations,
          'id',
          'text'
        );
        const resolvedMotherDesignation = lookupText(
          data.motherDesignation,
          designations,
          'id',
          'name'
        );
        const resolvedProgramOfStudy = lookupText(
          data.programOfStudy,
          programModes,
          'id',
          'name'
        );

        const payload: CreateApplicationCommand = {
          academicSession: resolvedSession,
          programme: resolvedProgramme,
          basicInfo: {
            firstName: data.firstName,
            middleName: data.middleName || '',
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            gender: resolvedGender,
            caste: data.caste,
            dateOfBirth: data.dateOfBirth ? formatDate(data.dateOfBirth) : '',
            age: Number(data.age),
            fatherName: data.fatherName,
            fatherOccupation: resolvedFatherOccupation,
            fatherDesignation: resolvedFatherDesignation,
            fatherAnnualIncome: Number(data.fatherAnnualIncome),
            fatherContactNumber: data.fatherContactNumber,
            motherName: data.motherName,
            motherOccupation: resolvedMotherOccupation,
            motherDesignation: resolvedMotherDesignation,
            motherAnnualIncome: Number(data.motherAnnualIncome),
            motherContactNumber: data.motherContactNumber,
            residencyStatus: resolvedResidency,
            ethnicity: data.ethnicity,
            nationality: resolvedNationality,
          },
          academic: {
            degreeLevel: resolvedDegreeLevel,
            programOfStudy: resolvedProgramOfStudy,
            specialisation: resolvedSpecialisation,
            previousInstitutionType: data.previousInstitutionType,
            previousInstitutionCgpa: Number(data.previousInstitutionCgpa),
          },
          address: {
            addressType: resolvedAddressType,
            country: data.country,
            state: resolvedState,
            division: resolvedDivision,
            district: resolvedDistrict,
            tehsil: resolvedTehsil,
            block: data.block,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2,
            landmark: data.landmark,
            zipcode: Number(data.zipcode),
          },
        };

        const result = await mutateAsync(payload);
        if (result) {
          ToastService.success('Application submitted successfully.');
          reset();
          setActiveStep(0);
        }
      } catch {
        ToastService.error('Failed to submit application.');
      }
    },
    errors => {
      console.log('Validation Errors on Save:', errors);
      ToastService.error('Please fix the validation errors in the form.');
    }
  );

  const handleNext = useCallback(async () => {
    const fields = STEP_FIELDS[activeStep];
    const isValid = await trigger(fields);
    if (isValid) {
      setActiveStep(prev => prev + 1);
    }
  }, [activeStep, trigger]);

  const handleBack = useCallback(() => {
    setActiveStep(prev => Math.max(0, prev - 1));
  }, []);

  const handleStepClick = useCallback(
    (index: number) => {
      if (index < activeStep) {
        setActiveStep(index);
      }
    },
    [activeStep]
  );

  const isLastStep = activeStep === STEPS.length - 1;

  return (
    <FormPage
      title="Student Application Form"
      description="Fill in all the required details to submit your application."
    >
      {/* Stepper */}
      <Stepper
        steps={STEPS}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />

      {/* Step Content */}
      <form onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-6 mb-6">
          {activeStep === 0 && <BasicInfoStep register={register} />}
          {activeStep === 1 && <FatherInfoStep register={register} />}
          {activeStep === 2 && <MotherInfoStep register={register} />}
          {activeStep === 3 && <AcademicInfoStep register={register} />}
          {activeStep === 4 && <AddressInfoStep register={register} />}
        </div>

        {/* Navigation Buttons */}
        <div className="form-actions-container form-actions-right">
          {activeStep > 0 && (
            <Button
              key="back-button"
              label="Back"
              type="button"
              onClick={handleBack}
              icon="arrow-left"
              variant="outlined"
            />
          )}
          {!isLastStep ? (
            <Button
              key="next-button"
              label="Next"
              type="button"
              onClick={handleNext}
              icon="arrow-right"
            />
          ) : (
            <Button
              key="save-button"
              label="Save"
              type="submit"
              icon="save"
              isLoading={isPending}
            />
          )}
        </div>
      </form>
    </FormPage>
  );
}
