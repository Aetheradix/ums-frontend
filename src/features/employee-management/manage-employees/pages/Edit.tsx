import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import FullOnboardingForm from '../../full-onboarding/components/FullOnboardingForm';
import {
  useGetFullOnboardingQuery,
  useUpdateFullOnboardingMutation,
} from '../../full-onboarding/queries';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);

  const { data, isLoading } = useGetFullOnboardingQuery(employeeId);
  const { mutateAsync, isPending } =
    useUpdateFullOnboardingMutation(employeeId);

  const handleBack = useCallback(() => {
    navigate('/employee-management/manage-employees');
  }, [navigate]);

  async function handleSubmit(formData: EmployeeManagement.FullOnboardingForm) {
    try {
      const result = await mutateAsync(formData);

      if (result) {
        ToastService.success('Employee updated successfully.');
        handleBack();
      }
    } catch (err) {
      ToastService.error(
        err instanceof Error ? err.message : 'Failed to update employee.'
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Employee details not found.
      </div>
    );
  }

  return (
    <FormPage
      title="Edit Full Onboarding"
      description="Update employee onboarding details."
    >
      <FullOnboardingForm
        onSubmit={handleSubmit}
        isSaving={isPending}
        fetchData={data}
      />
    </FormPage>
  );
}
