import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FormPage } from 'shared/new-components';
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
import './Create.css';

const STEPS = [
  {
    label: 'College Details',
    description: 'Basic college information',
    icon: 'building',
  },
  {
    label: 'Other Details',
    description: 'Principal and society details',
    icon: 'user',
  },
  {
    label: 'Course Details',
    description: 'Programme and subject details',
    icon: 'book',
  },
  {
    label: 'Enclosures',
    description: 'Upload required documents',
    icon: 'folder-open',
  },
];

export default function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCollegeRegistrationMutation();

  const { register, control, handleSubmit, reset, trigger, setValue } =
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

  const renderActiveStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <CollegeRegistrationStep
            register={register}
            control={control}
            setValue={setValue}
          />
        );

      case 1:
        return <AffiliationOtherDetailsStep register={register} />;

      case 2:
        return <CollegeCourseDetailStep control={control} />;

      case 3:
        return <CollegeEnclosureStep control={control} />;

      default:
        return null;
    }
  };

  const isLastStep = activeStep === STEPS.length - 1;

  return (
    <FormPage
      title="Application for Affiliation"
      description="Fill in all the required details to submit the affiliation application."
    >
      <div className="affiliation-create-layout">
        <aside className="affiliation-step-panel">
          <div className="affiliation-step-panel-header">
            <span className="affiliation-step-panel-dot" />

            <div>
              <h3>Application Progress</h3>
              <p>Complete all the steps to submit your application.</p>
            </div>
          </div>

          <div className="affiliation-step-list">
            {STEPS.map((step, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;
              const canClick = index < activeStep;

              return (
                <button
                  key={step.label}
                  type="button"
                  className={`affiliation-step-item ${
                    isActive ? 'active' : ''
                  } ${isCompleted ? 'completed' : ''}`}
                  onClick={() => canClick && handleStepClick(index)}
                  disabled={!canClick && !isActive}
                >
                  <span className="affiliation-step-number">
                    {isCompleted ? <i className="pi pi-check" /> : index + 1}
                  </span>

                  <span className="affiliation-step-content">
                    <strong>{step.label}</strong>
                    <small>{step.description}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <section className="affiliation-form-panel">
          <form onSubmit={onFormSubmit}>
            <div className="affiliation-form-content">{renderActiveStep()}</div>

            <div className="affiliation-form-actions">
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
        </section>
      </div>
    </FormPage>
  );
}
