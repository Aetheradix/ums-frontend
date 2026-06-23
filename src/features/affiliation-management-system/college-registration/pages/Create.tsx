import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FormWizard } from 'shared/components/forms';
import type { WizardStep } from 'shared/components/forms/FormWizard';
import { FormPage } from 'shared/new-components';
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

export default function Create() {
  const [isUploading, setIsUploading] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftAppNumber, setDraftAppNumber] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const submitTypeRef = useRef<'DRAFT' | 'FINAL'>('DRAFT');

  const navigate = useNavigate();
  const { mutateAsync: createMutate, isPending } =
    useCreateCollegeRegistrationMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    resetField,
  } = useCollegeApplicationForm();

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
                    (acc: number, course: any) =>
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

  const wizardSteps: WizardStep[] = [
    {
      label: 'College Details',
      icon: 'building',
      content: (
        <CollegeRegistrationStep
          register={register}
          control={control}
          setValue={setValue}
        />
      ),
    },
    {
      label: 'Management Details',
      icon: 'user',
      content: <AffiliationOtherDetailsStep register={register} />,
    },
    {
      label: 'Course Details',
      icon: 'book',
      content: <CollegeCourseDetailStep control={control} />,
    },
    {
      label: 'Enclosures',
      icon: 'folder-open',
      content: (
        <CollegeEnclosureStep
          register={register}
          control={control}
          setValue={setValue}
        />
      ),
    },
  ];

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
      <FormWizard
        steps={wizardSteps}
        onComplete={handleFinalSubmit}
        isSaving={isPending || isUploading}
        triggerValidation={trigger as (fields: string[]) => Promise<boolean>}
        onResetStep={activeIndex => {
          const fields = STEP_FIELDS[activeIndex];
          fields?.forEach(field => resetField(field as any));
        }}
        customActions={(_, isLastStep) =>
          isLastStep ? (
            <Button
              type="button"
              label="Save as Draft"
              variant="outlined"
              onClick={async () => {
                submitTypeRef.current = 'DRAFT';
                setValue('isSubmitted', false);
                await onFormSubmit();
              }}
              disabled={isUploading || isPending}
              icon="save"
            />
          ) : null
        }
      />

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
