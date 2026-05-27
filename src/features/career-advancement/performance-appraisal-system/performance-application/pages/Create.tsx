import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import { toDateOnly } from 'shared/utils/dateUtils';
import PerformanceAppraisalApplication from '../components/PerformanceAppraisalApplication';
import {
  useCreatePerformanceAppraisalMutation,
  useGetPerformanceAppraisalByEmployeeIdQuery,
  useUpdatePerformanceAppraisalMutation,
} from '../queries';

// TODO: Real auth context se lena baad me
const CURRENT_EMPLOYEE_ID = 1;

export default function Create() {
  const navigate = useNavigate();

  // EmployeeId se existing application fetch karo
  const { data: existingApplication, isLoading: isFetching } =
    useGetPerformanceAppraisalByEmployeeIdQuery(CURRENT_EMPLOYEE_ID);

  const { mutateAsync: createMutation, isPending: isCreating } =
    useCreatePerformanceAppraisalMutation();

  const { mutateAsync: updateMutation, isPending: isUpdating } =
    useUpdatePerformanceAppraisalMutation();

  const isSaving = isCreating || isUpdating;

  const handleBack = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  async function handleSubmit(
    data: CareerAdvancement.PerformanceAppraisalApplicationForm,
    status: 'Draft' | 'Submitted'
  ) {
    const applicationDate = data.applicationSubmissionDate
      ? (toDateOnly(data.applicationSubmissionDate) as unknown as string)
      : '';

    if (existingApplication?.applicationId) {
      const payload: CareerAdvancement.UpdatePerformanceAppraisalApplicationPayload =
        {
          applicationId: existingApplication.applicationId,
          assessmentSessionId: data.assessmentSessionId,
          stageApplyingFor: data.stageApplyingFor,
          applicationSubmissionDate: applicationDate,
          status: status,
          isActive: true,
        };

      await updateMutation(payload);
      ToastService.success('Application updated successfully.');
      handleBack();
    } else {
      const payload: CareerAdvancement.CreatePerformanceAppraisalApplicationPayload =
        {
          employeeId: CURRENT_EMPLOYEE_ID,
          assessmentSessionId: data.assessmentSessionId,
          stageApplyingFor: data.stageApplyingFor,
          applicationSubmissionDate: applicationDate,
          status: status,
          isActive: true,
        };

      await createMutation(payload);
      ToastService.success('Application submitted successfully.');
      handleBack();
    }
  }

  if (isFetching) {
    return (
      <FormPage
        title="PBAS / CAS Application"
        description="Career Advancement Scheme performance based appraisal system"
      >
        <div>Loading your application data...</div>
      </FormPage>
    );
  }

  // Agar existing application hai to uski values form me pre-fill karein
  const initialData: CareerAdvancement.PerformanceAppraisalApplicationForm =
    existingApplication
      ? {
          assessmentSessionId: existingApplication.assessmentSessionId,
          stageApplyingFor: existingApplication.stageApplyingFor,
          applicationSubmissionDate:
            existingApplication.applicationSubmissionDate
              ? new Date(existingApplication.applicationSubmissionDate)
              : null,
          status: existingApplication.status,
        }
      : {
          assessmentSessionId: 0,
          stageApplyingFor: '',
          applicationSubmissionDate: null,
          status: 'Draft',
        };

  return (
    <FormPage
      title={
        existingApplication
          ? 'Update PBAS / CAS Application'
          : 'Create PBAS / CAS Application'
      }
      description="Career Advancement Scheme performance based appraisal system"
    >
      <PerformanceAppraisalApplication
        onSubmit={handleSubmit}
        onCancel={handleBack}
        isSaving={isSaving}
        initialData={initialData}
      />
    </FormPage>
  );
}
