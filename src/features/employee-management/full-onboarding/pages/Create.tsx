import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { Card } from 'shared/components/panels';
import Page from 'shared/components/panels/Page';
import FullOnboardingForm from '../components/FullOnboardingForm';
import { useCreateFullOnboardingMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateFullOnboardingMutation();

  const handleBack = useCallback(() => {
    navigate('/employee-management/manage-employees');
  }, [navigate]);

  async function handleSubmit(data: EmployeeManagement.FullOnboardingForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Employee onboarded successfully.');
        handleBack();
      } else {
        ToastService.error('Failed to onboard employee.');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      ToastService.error(errorMessage || 'Failed to onboard employee.');
    }
  }

  return (
    <Page header="Full Onboarding">
      <Card>
        <FullOnboardingForm onSubmit={handleSubmit} isSaving={isPending} />
      </Card>
    </Page>
  );
}
