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
                <>
                  <Button
                    key="draft-button"
                    label="Save as Draft"
                    type="submit"
                    icon="save"
                    variant="outlined"
                    className="!w-auto"
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
        header={
          <span className="text-xl font-bold text-slate-800">
            Application Saved as Draft
          </span>
        }
        visible={showDraftDialog}
        style={{ width: '32rem' }}
        onHide={() => {
          setShowDraftDialog(false);
          reset();
          navigate(-1);
        }}
        footer={null}
      >
        <div className="flex flex-col gap-5 pt-2">
          <p className="m-0 text-base text-slate-700">
            Your application has been saved successfully as a draft.
          </p>

          <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-blue-100 bg-blue-50/50 py-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Application Number
            </span>
            <span className="text-2xl font-bold tracking-widest text-blue-900">
              {draftAppNumber}
            </span>
          </div>

          <div className="rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900 shadow-sm">
            <span className="block font-bold mb-1">Important Note:</span>
            If you wish to resume or edit this application later, you will need
            this Application Number along with the Affiliation Year. Please keep
            it secure.
          </div>

          <div className="mt-2 flex justify-end">
            <Button
              label="OK"
              icon="check"
              variant="primary"
              className="w-28"
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
