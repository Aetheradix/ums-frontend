import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FormPage, Stepper } from 'shared/new-components';
import { uploadCollegeDocuments } from '../api';
import AffiliationOtherDetailsStep from '../components/AffiliationOtherDetailsStep';
import CollegeCourseDetailStep from '../components/CollegeCourseDetailStep';
import CollegeEnclosureStep from '../components/CollegeEnclosureStep';
import CollegeRegistrationStep from '../components/CollegeRegistrationStep';
import {
  STEP_FIELDS,
  useCollegeApplicationForm,
} from '../components/form.hook';
import { useCreateCollegeRegistrationMutation } from '../queries';

const STEPS = [
  { label: 'College Details' },
  { label: 'Other Details' },
  { label: 'Course Details' },
  { label: 'Enclosures' },
];

export default function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCollegeRegistrationMutation();

  const { register, control, handleSubmit, reset, trigger } =
    useCollegeApplicationForm();

  const onFormSubmit = handleSubmit(
    async data => {
      try {
        setIsUploading(true);
        const documentIds = await uploadCollegeDocuments(
          data.nocFile,
          data.affidavitFile,
          data.regularAuthorityFile
        );
        setIsUploading(false);

        const result = await mutateAsync({ data, documentIds });
        if (result) {
          ToastService.success('College Registration submitted successfully.');
          reset();
          navigate(-1);
        }
      } catch {
        setIsUploading(false);
        ToastService.error('Failed to submit college registration');
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
      title="Application for Affiliation"
      description="Fill in all the required details to submit the affiliation application."
    >
      <Stepper
        steps={STEPS}
        activeStep={activeStep}
        onStepClick={handleStepClick}
      />

      <form onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-6 mb-6">
          {activeStep === 0 && (
            <CollegeRegistrationStep register={register} control={control} />
          )}
          {activeStep === 1 && (
            <AffiliationOtherDetailsStep register={register} />
          )}
          {activeStep === 2 && <CollegeCourseDetailStep control={control} />}
          {activeStep === 3 && <CollegeEnclosureStep control={control} />}
        </div>

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
              key="submit-button"
              label={
                isUploading
                  ? 'Uploading...'
                  : isPending
                    ? 'Saving...'
                    : 'Submit'
              }
              type="submit"
              icon="check"
              isLoading={isPending || isUploading}
            />
          )}
        </div>
      </form>
    </FormPage>
  );
}
