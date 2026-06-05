import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import QuickOnboardingForm from '../components/QuickOnboardingForm';
import { useCreateEmployeeRegistrationMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateEmployeeRegistrationMutation();

  const handleBack = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  async function handleSubmit(data: EmployeeManagement.QuickOnboardingForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Employee registered successfully.');
        handleBack();
      } else {
        ToastService.error('Failed to register employee.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      ToastService.error(errorMessage || 'Failed to register employee.');
    }
  }

  return (
    <FormPage
      title="Quick Onboarding"
      description="Quick employee onboarding and registration form."
    >
      <QuickOnboardingForm
        onSubmit={handleSubmit}
        onCancel={handleBack}
        isSaving={isPending}
      />
    </FormPage>
  );
}
