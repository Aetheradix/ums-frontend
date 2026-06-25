import { useCallback, useRef, useState } from 'react';
import { FormProvider, type Path, type UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FormPage, Stepper } from 'shared/new-components';
// import { uploadCollegeDocuments } from '../api';
import AffiliationOtherDetailsStep from '../components/AffiliationOtherDetailsStep';
import CollegeCourseDetailStep from '../components/CollegeCourseDetailStep';
import CollegeEnclosureStep from '../components/CollegeEnclosureStep';
import CollegeRegistrationStep from '../components/CollegeRegistrationStep';
import DraftSuccessDialog from '../components/DraftSuccessDialog';
import PaymentConfirmationDialog from '../components/PaymentConfirmationDialog';
import {
  STEP_FIELDS,
  useCollegeApplicationForm,
} from '../components/form.hook';
import { useCreateCollegeRegistrationMutation } from '../queries';
import './Create.css';

const STEPS = [
  { label: 'College Details' },
  { label: 'Management Details' },
  { label: 'Course Details' },
  { label: 'Enclosures' },
];

export default function Create() {
  const [activeStep, setActiveStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftAppNumber, setDraftAppNumber] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<{
    collegeName: string;
    collegeCode: string;
    applicationNumber: string;
    totalAmount: number;
    email: string;
    date: string;
    transactionId: string | number;
  } | null>(null);
  const submitTypeRef = useRef<'DRAFT' | 'FINAL'>('DRAFT');

  const navigate = useNavigate();
  const { mutateAsync: createMutate, isPending } =
    useCreateCollegeRegistrationMutation();

  const { methods, register, control, handleSubmit, reset, trigger, setValue } =
    useCollegeApplicationForm();

  const onFormSubmit = handleSubmit(
    async data => {
      try {
        const isFinalSubmit = submitTypeRef.current === 'FINAL';
        data.isSubmitted = isFinalSubmit;

        // setIsUploading(true);
        // const documentIds = await uploadCollegeDocuments(
        //   data.nocFile,
        //   data.affidavitFile,
        //   data.regularAuthorityFile
        // );
        // setIsUploading(false);

        const result = await createMutate({ data, documentIds: [] });

        if (result) {
          if (data.isSubmitted === false) {
            setDraftAppNumber(data.applicationNumber || '');
            setShowDraftDialog(true);
          } else {
            ToastService.success(
              'College Registration submitted successfully.'
            );
            if (result.paymentTransactionId) {
              setPaymentDetails({
                collegeName: data.collegeName,
                collegeCode: data.collegeCode,
                applicationNumber: result.applicationNumber,
                totalAmount:
                  data.totalFees ||
                  (data.courses ?? []).reduce(
                    (acc: number, course: { totalAmount?: number }) =>
                      acc + (course.totalAmount || 0),
                    0
                  ),
                email: data.collegeEmail,
                date: new Date().toLocaleDateString(),
                transactionId: result.paymentTransactionId,
              });
            } else {
              reset();
              navigate(-1);
            }
          }
        }
      } catch {
        setIsUploading(false);
        ToastService.error('Failed to submit college registration');
      }
    },
    () => {
      ToastService.error('Please fix the validation errors in the form.');
    }
  );

  const handleFinalSubmit = async () => {
    submitTypeRef.current = 'FINAL';
    setValue('isSubmitted', true);
    await onFormSubmit();
  };

  const handleNext = useCallback(async () => {
    const fields = STEP_FIELDS[activeStep];
    const isValid = await trigger(
      fields as Path<AffiliationManagementSystem.CollegeApplicationFormData>[]
    );
    if (isValid) setActiveStep(prev => prev + 1);
  }, [activeStep, trigger]);

  const handleBack = useCallback(() => {
    setActiveStep(prev => Math.max(0, prev - 1));
  }, []);

  const handleStepClick = useCallback(
    (index: number) => {
      if (index < activeStep) setActiveStep(index);
    },
    [activeStep]
  );

  const isLastStep = activeStep === STEPS.length - 1;

  const handleCloseDraftDialog = () => {
    setShowDraftDialog(false);
    reset();
    navigate(-1);
  };

  const handlePayNow = () => {
    navigate('/payment-management/college-affiliation/receipt', {
      state: { receiptData: paymentDetails },
    });
  };

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

      <FormProvider
        {...(methods as unknown as UseFormReturn<AffiliationManagementSystem.CollegeApplicationFormData>)}
      >
        <form onSubmit={onFormSubmit}>
          <div className="flex flex-col gap-6 mb-6 mt-6">
            {activeStep === 0 && (
              <CollegeRegistrationStep
                register={register}
                control={control}
                setValue={setValue}
              />
            )}
            {activeStep === 1 && (
              <AffiliationOtherDetailsStep
                register={register}
                setValue={setValue}
              />
            )}
            {activeStep === 2 && <CollegeCourseDetailStep control={control} />}
            {activeStep === 3 && (
              <CollegeEnclosureStep
                register={register}
                control={control}
                setValue={setValue}
              />
            )}
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
              <>
                <Button
                  key="draft-button"
                  label="Save as Draft"
                  type="button"
                  variant="outlined"
                  onClick={async () => {
                    submitTypeRef.current = 'DRAFT';
                    setValue('isSubmitted', false);
                    await onFormSubmit();
                  }}
                  disabled={isUploading || isPending}
                  icon="save"
                />
                <Button
                  key="save-button"
                  label="Save"
                  type="button"
                  icon="save"
                  onClick={handleFinalSubmit}
                  isLoading={isPending || isUploading}
                />
              </>
            )}
          </div>
        </form>
      </FormProvider>

      <DraftSuccessDialog
        visible={showDraftDialog}
        draftAppNumber={draftAppNumber}
        onClose={handleCloseDraftDialog}
      />

      <PaymentConfirmationDialog
        visible={!!paymentDetails}
        onHide={() => setPaymentDetails(null)}
        onPayNow={handlePayNow}
        details={paymentDetails}
      />
    </FormPage>
  );
}
