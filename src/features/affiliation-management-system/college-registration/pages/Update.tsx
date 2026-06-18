import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import { uploadCollegeDocuments } from '../api';
import {
  STEP_FIELDS,
  useCollegeApplicationForm,
} from '../components/form.hook';
import { useUpdateCollegeRegistrationMutation } from '../queries';
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

export default function Update() {
  const [activeStep, setActiveStep] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showDraftDialog, setShowDraftDialog] = useState(false);
  const [draftAppNumber, setDraftAppNumber] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: updateMutate, isPending } =
    useUpdateCollegeRegistrationMutation();

  const { register, control, handleSubmit, reset, trigger, setValue } =
    useCollegeApplicationForm();

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
        setIsUploading(true);
        const documentIds = await uploadCollegeDocuments(
          data.nocFile,
          data.affidavitFile,
          data.regularAuthorityFile
        );
        setIsUploading(false);

        if (!registrationId) {
          ToastService.error('Registration ID is missing. Cannot update.');
          return;
        }

        const result = await updateMutate({
          id: registrationId,
          data,
          documentIds,
        });

        if (result) {
          if (data.isSubmitted === false) {
            setDraftAppNumber(data.applicationNumber || '');
            setShowDraftDialog(true);
          } else {
            ToastService.success('College Registration updated successfully.');
            reset();
            navigate(
              '/affiliation-management-system/draft-registration-request'
            );
          }
        }
      } catch {
        setIsUploading(false);
        ToastService.error('Failed to update college registration');
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
            isEdit={true}
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
    navigate('/affiliation-management-system/draft-registration-request');
  };

  if (!draftData) return null;

  return (
    <FormPage
      title="Update Application for Affiliation"
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
