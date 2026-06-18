import { useCallback, useState } from 'react';
import { ToastService } from 'services';
import { FormPage, Stepper } from 'shared/new-components';
import { Button } from 'shared/components/buttons';

import { useCreateEmployeeFullRegistrationMutation } from '../queries';
import { useFullOnboardingForm } from '../components/form.hook';

import PersonalInfoStep from '../components/PersonalInfoStep';
import ServiceInfoStep from '../components/ServiceInfoStep';
import EducationInfoStep from '../components/EducationInfoStep';
import AddressInfoStep from '../components/AddressInfoStep';

const STEPS = [
  { label: 'Personal Info' },
  { label: 'Service Info' },
  { label: 'Education Info' },
  { label: 'Address & Emergency' },
];

const STEP_FIELDS: Record<number, string[]> = {
  0: [
    'salutation',
    'firstName',
    'middleName',
    'lastName',
    'gender',
    'dateOfBirth',
    'appointedCategory',
    'mobileNumber',
    'officialEmail',
    'panNumber',
    'bloodGroup',
    'maritalStatus',
  ],
  1: [
    'employeeCode',
    'employeeType',
    'employeeNatureId',
    'organizationUnitId',
    'postId',
    'subjectSpecializationId',
    'dateOfJoining',
    'seniorityRank',
  ],
  2: ['qualifications'],
  3: ['addresses', 'emergencyPhoneNumber'],
};

function formatDate(date: any): string | null {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function sanitizePayload(data: any): any {
  if (data === null || data === undefined) return null;
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map(sanitizePayload);
    }
    const result: any = {};
    for (const key in data) {
      if (data[key] === '') {
        result[key] = null;
      } else if (
        key.endsWith('Id') ||
        key === 'yearOfPassing' ||
        key === 'percentage' ||
        key === 'zipcode'
      ) {
        // Try to parse numbers for specific keys if they are strings
        result[key] =
          typeof data[key] === 'string' && !isNaN(Number(data[key]))
            ? Number(data[key])
            : sanitizePayload(data[key]);
      } else {
        result[key] = sanitizePayload(data[key]);
      }
    }
    return result;
  }
  return data;
}

export default function OnboardingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const { mutateAsync, isPending } =
    useCreateEmployeeFullRegistrationMutation();

  const methods = useFullOnboardingForm();
  const { register, control, handleSubmit, reset, trigger, setValue } = methods;

  const onFormSubmit = handleSubmit(
    async (data: EmployeeManagement.FullOnboardingForm) => {
      try {
        const rawPayload: any = {
          ...data,
          dateOfBirth: formatDate(data.dateOfBirth),
          dateOfJoining: formatDate(data.dateOfJoining),
          dateOfSuperannuation: formatDate(data.dateOfSuperannuation),
          passportValidity: formatDate(data.passportValidity),
        };

        const payload = sanitizePayload(
          rawPayload
        ) as EmployeeManagement.FullOnboardingForm;

        const result = await mutateAsync(payload);
        if (result) {
          ToastService.success('Employee onboarded successfully.');
          reset();
          setActiveStep(0);
        }
      } catch (err: any) {
        console.error('API Error:', err);

        let errorMsg = 'Failed to submit application.';
        if (err.response?.data?.errors) {
          // If FluentValidation errors exist
          const validationErrors = err.response.data.errors;
          const firstErrorKey = Object.keys(validationErrors)[0];
          errorMsg = validationErrors[firstErrorKey]?.[0] || errorMsg;
        } else if (err.response?.data?.detail) {
          errorMsg = err.response.data.detail;
        } else if (err.response?.data?.title) {
          errorMsg = err.response.data.title;
        } else if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        }

        ToastService.error(errorMsg);
      }
    },
    errors => {
      console.log('Validation Errors on Save:', errors);
      ToastService.error('Please fix the validation errors in the form.');
    }
  );

  const handleNext = useCallback(async () => {
    const fields = STEP_FIELDS[activeStep];
    const isValid = await trigger(fields as any);
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
      title="Employee Full Onboarding"
      description="Fill in all the required details across all sections to onboard a new employee."
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
          {activeStep === 0 && <PersonalInfoStep register={register} />}
          {activeStep === 1 && <ServiceInfoStep register={register} />}
          {activeStep === 2 && (
            <EducationInfoStep register={register} control={control} />
          )}
          {activeStep === 3 && (
            <AddressInfoStep
              register={register}
              control={control}
              setValue={setValue}
            />
          )}
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
