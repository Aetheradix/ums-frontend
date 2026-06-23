import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FormWizard } from 'shared/components/forms';
import type { WizardStep } from 'shared/components/forms/FormWizard';
import { FormPage } from 'shared/new-components';
import { uploadCollegeDocuments } from '../api';
import AffiliationOtherDetailsStep from '../components/AffiliationOtherDetailsStep';
import CollegeCourseDetailStep from '../components/CollegeCourseDetailStep';
import CollegeEnclosureStep from '../components/CollegeEnclosureStep';
import CollegeRegistrationStep from '../components/CollegeRegistrationStep';
import DraftSuccessDialog from '../components/DraftSuccessDialog';
import PaymentConfirmationDialog from '../components/PaymentConfirmationDialog';
import {
  useCollegeApplicationForm,
  STEP_FIELDS,
} from '../components/form.hook';
import { useUpdateCollegeRegistrationMutation } from '../queries';
import './Create.css';

export default function Update() {
  const [isUploading, setIsUploading] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftAppNumber, setDraftAppNumber] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const submitTypeRef = useRef<'DRAFT' | 'FINAL'>('DRAFT');

  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: updateMutate, isPending } =
    useUpdateCollegeRegistrationMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
    resetField,
  } = useCollegeApplicationForm();

  const draftData = location.state
    ?.draftData as AffiliationManagementSystem.DraftRegistrationRequest;
  const registrationId = draftData?.registrationId;

  useEffect(() => {
    if (draftData) {
      const availableFacilitiesMap =
        draftData.availableFacilities?.reduce(
          (acc, curr) => {
            acc[curr] = true;
            return acc;
          },
          {} as Record<number, boolean>
        ) || {};

      const otherFacilitiesArray = draftData.availableFacilitiesOther
        ? draftData.availableFacilitiesOther
            .split(',')
            .map(name => ({ facilityName: name.trim() }))
        : [];

      reset({
        applicationNumber: draftData.applicationNumber,
        collegeName: draftData.collegeName,
        collegeCode: draftData.collegeCode,
        establishmentYear: draftData.establishmentYear,
        collegeAddress: draftData.collegeAddress,
        districtId: draftData.districtId,
        telephoneNo: draftData.telephoneNo,
        collegeEmail: draftData.collegeEmail,
        collegeCategoryId: draftData.collegeCategoryId,
        collegeTypeId: draftData.collegeTypeId,
        accommodationType: draftData.accommodationType,
        collegeArea: draftData.collegeArea,
        availableFacilities: availableFacilitiesMap,
        otherFacilities: otherFacilitiesArray,
        principalDirectorName:
          draftData.affiliation?.principalDirectorName || '',
        principalMobileNo: draftData.affiliation?.principalMobileNo || '',
        principalEmail: draftData.affiliation?.principalEmail || '',
        societyName: draftData.affiliation?.societyName || '',
        secretaryName: draftData.affiliation?.secretaryName || '',
        societyRegistrationNo:
          draftData.affiliation?.societyRegistrationNo || '',
        societyRegistrationDate: draftData.affiliation?.societyRegistrationDate
          ? new Date(draftData.affiliation.societyRegistrationDate)
          : undefined,
        isOtherInstitutionRunning:
          draftData.affiliation?.isOtherInstitutionRunning || false,
        courses:
          draftData.courses?.map(c => ({
            courseId: c.courseId,
            subjectIds: c.subjectIds || [],
            totalAmount: c.totalAmount,
            isFeePaid: c.isFeePaid,
            paymentDate: c.paymentDate ? c.paymentDate : null,
          })) || [],
      });
    } else {
      ToastService.error('No draft data found. Redirecting to search.');
      navigate('/affiliation-management-system/draft-registration-request');
    }
  }, [draftData, reset, navigate]);

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

        if (!registrationId) {
          ToastService.error('Registration ID is missing. Cannot update.');
          return;
        }

        const result = await updateMutate({
          id: registrationId,
          data,
          documentIds: [],
        });

        if (result) {
          if (data.isSubmitted === false) {
            setDraftAppNumber(data.applicationNumber || '');
            setShowDraftDialog(true);
          } else {
            ToastService.success('College Registration updated successfully.');
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
              navigate(
                '/affiliation-management-system/draft-registration-request'
              );
            }
          }
        }
      } catch {
        setIsUploading(false);
        ToastService.error('Failed to update college registration');
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
          isEdit={true}
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
    navigate('/affiliation-management-system/draft-registration-request');
  };

  const handlePayNow = () => {
    navigate('/payment-management/college-affiliation/receipt', {
      state: { receiptData: paymentDetails },
    });
  };

  if (!draftData) return null;

  return (
    <FormPage
      title="Update Application for Affiliation"
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
        isEdit={true}
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
