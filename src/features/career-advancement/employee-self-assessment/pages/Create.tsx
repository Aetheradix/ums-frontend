import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import EmployeeSelfAssessmentForm from '../components/EmployeeSelfAssessmentForm';
import { useCreateEmployeeSelfAssessmentMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateEmployeeSelfAssessmentMutation();

  const handleBack = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  async function handleSubmit(
    data: CareerAdvancement.EmployeeSelfAssessmentForm
  ) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success(
          'Employee Self Assessment submitted successfully.'
        );
        handleBack();
      }
    } catch (err: any) {
      ToastService.error(
        err?.message || 'Failed to submit Employee Self Assessment.'
      );
    }
  }

  return (
    <FormPage
      title="Employee Self Assessment"
      description="Annual Performance Assessment Report (APAR) - Employee Self Assessment"
    >
      <EmployeeSelfAssessmentForm
        onSubmit={handleSubmit}
        onCancel={handleBack}
        isSaving={isPending}
      />
    </FormPage>
  );
}
