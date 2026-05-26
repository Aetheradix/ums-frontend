import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import { formatDatesInPayload } from 'shared/utils/dateUtils';
import PerformanceAppraisalApplication from '../components/PerformanceAppraisalApplication';
import { useCreatePerformanceAppraisalMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();

  const { mutateAsync: createMutation, isPending } =
    useCreatePerformanceAppraisalMutation();

  const handleBack = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  async function handleSubmit(
    data: CareerAdvancement.PerformanceAppraisalApplicationForm,
    status: 'Draft' | 'Submitted'
  ) {
    const rawPayload = {
      ...data,
      employeeId: Number(data.employeeId) || 1,
      designationId: data.designationId!,
      casteId: data.casteId!,
      departmentId: data.departmentId!,
      status: status,
      isActive: true,
    } as CareerAdvancement.CreatePerformanceAppraisalApplicationPayload;

    const payload = formatDatesInPayload(rawPayload);

    const result = await createMutation(payload);

    if (result) {
      ToastService.success('Application submitted successfully.');
      handleBack();
    }
  }
  return (
    <FormPage
      title="Create PBAS / CAS Application"
      description="Career Advancement Scheme performance based appraisal system"
    >
      <PerformanceAppraisalApplication
        onSubmit={handleSubmit}
        onCancel={handleBack}
        isSaving={isPending}
        initialData={{
          employeeName: '',
          employeeId: '',
          designationId: null,
          casteId: null,
          departmentId: null,
          dateOfBirth: null,
          dateOfJoining: null,
          stageApplyingFor: '',
          applicationSubmissionDate: null,
          lastPromotionDate: null,
        }}
      />
    </FormPage>
  );
}
