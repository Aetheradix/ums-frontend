import { Dialog } from 'primereact/dialog';
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
    label: 'Management Details',
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
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftAppNumber, setDraftAppNumber] = useState('');
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
          if (data.isSubmitted === false) {
            setDraftAppNumber(data.applicationNumber || '');
            setShowDraftDialog(true);
          } else {
            ToastService.success(
              'College Registration submitted successfully.'
            );
            reset();
            navigate(-1);
          }
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
    } else {
      if (activeStep === 2) {
        ToastService.error('Please add at least one course to proceed.');
      } else {
        ToastService.error(
          'Please fix the validation errors before proceeding.'
        );
      }
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

  const handleCopyDraftNumber = useCallback(async () => {
    if (!draftAppNumber) return;

    try {
      await navigator.clipboard.writeText(draftAppNumber);
      ToastService.success('Application number copied.');
    } catch {
      ToastService.error('Unable to copy application number.');
    }
  }, [draftAppNumber]);

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
        return (
          <CollegeEnclosureStep
            register={register}
            control={control}
            setValue={setValue}
          />
        );

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
            <span className="affiliation-step-panel-icon">
              <i className="pi pi-check-square" />
            </span>

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
                <>
                  <Button
                    key="draft-button"
                    label="Save as Draft"
                    type="submit"
                    icon="save"
                    variant="outlined"
                    className="w-auto!"
                    onClick={() => setValue('isSubmitted', false)}
                    isLoading={isPending || isUploading}
                  />
                  <Button
                    key="submit-button"
                    label={
                      isUploading
                        ? 'Uploading...'
                        : isPending
                          ? 'Saving...'
                          : 'Final Submit'
                    }
                    type="submit"
                    icon="check"
                    onClick={() => setValue('isSubmitted', true)}
                    isLoading={isPending || isUploading}
                  />
                </>
              )}
            </div>
          </form>
        </section>
      </div>

      <Dialog
        visible={showDraftDialog}
        className="draft-success-dialog"
        showHeader={false}
        style={{ width: '34rem' }}
        onHide={() => {
          setShowDraftDialog(false);
          reset();
          navigate(-1);
        }}
        footer={null}
      >
        <button
          type="button"
          className="draft-success-close"
          onClick={() => {
            setShowDraftDialog(false);
            reset();
            navigate(-1);
          }}
        >
          <i className="pi pi-times" />
        </button>

        <div className="draft-success-content">
          <div className="draft-success-icon-wrap">
            <span className="draft-success-icon">
              <i className="pi pi-check" />
            </span>
          </div>

          <div className="draft-success-header">
            <h3>Application Saved as Draft</h3>
            <p>Your application has been saved successfully as a draft.</p>
          </div>

          <div className="draft-application-number-card">
            <span>Application Number</span>

            <strong>{draftAppNumber}</strong>

            <button
              type="button"
              className="draft-copy-button"
              onClick={handleCopyDraftNumber}
              title="Copy application number"
            >
              <i className="pi pi-copy" />
            </button>
          </div>

          <div className="draft-important-note">
            <span className="draft-note-icon">
              <i className="pi pi-info" />
            </span>

            <div>
              <strong>Important Note</strong>
              <p>
                To resume or edit this application later, you will need this
                Application Number along with the Affiliation Year. Please keep
                it secure.
              </p>
            </div>
          </div>

          <div className="draft-success-actions">
            <Button
              label="OK, Got it"
              icon="check"
              variant="primary"
              onClick={() => {
                setShowDraftDialog(false);
                reset();
                navigate(-1);
              }}
            />
          </div>
        </div>
      </Dialog>
    </FormPage>
  );
}
