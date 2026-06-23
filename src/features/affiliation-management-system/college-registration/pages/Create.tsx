import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import { uploadCollegeDocuments } from '../api';
import {
  STEP_FIELDS,
  useCollegeApplicationForm,
} from '../components/form.hook';
import { useCreateCollegeRegistrationMutation } from '../queries';
import AffiliationOtherDetailsStep from '../components/AffiliationOtherDetailsStep';
import CollegeCourseDetailStep from '../components/CollegeCourseDetailStep';
import CollegeEnclosureStep from '../components/CollegeEnclosureStep';
import CollegeRegistrationStep from '../components/CollegeRegistrationStep';
import DraftSuccessDialog from '../components/DraftSuccessDialog';
import FormStepperActions from '../components/FormStepperActions';
import FormStepperSidebar, {
  REGISTRATION_STEPS,
} from '../components/FormStepperSidebar';
import './Create.css';

export default function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftAppNumber, setDraftAppNumber] = useState('');

  const navigate = useNavigate();
  const { mutateAsync: createMutate, isPending } =
    useCreateCollegeRegistrationMutation();

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

        const result = await createMutate({ data, documentIds });

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

  const handleCloseDraftDialog = () => {
    setShowDraftDialog(false);
    reset();
    navigate(-1);
  };

  return (
    <FormPage
      title="Application for Affiliation"
      description="Fill in all the required details to submit the affiliation application."
    >
      <div className="affiliation-create-layout">
        <FormStepperSidebar
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />

        <section className="affiliation-form-panel">
          <form onSubmit={onFormSubmit}>
            <div className="affiliation-form-content">{renderActiveStep()}</div>
            <FormStepperActions
              activeStep={activeStep}
              totalSteps={REGISTRATION_STEPS.length}
              isPending={isPending}
              isUploading={isUploading}
              onBack={handleBack}
              onNext={handleNext}
              onSaveDraft={() => setValue('isSubmitted', false)}
              onFinalSubmit={() => setValue('isSubmitted', true)}
            />
          </form>
        </section>
      </div>

      <DraftSuccessDialog
        visible={showDraftDialog}
        draftAppNumber={draftAppNumber}
        onClose={handleCloseDraftDialog}
      />
    </FormPage>
  );
}
