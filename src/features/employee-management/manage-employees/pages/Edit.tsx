import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastService } from 'services';
import { FormPage } from 'shared/new-components';
import FullOnboardingForm from '../../full-onboarding/components/FullOnboardingForm';
import QuickOnboardingForm from '../../quick-onboarding/components/QuickOnboardingForm';
import {
  useGetFullOnboardingQuery,
  useUpdateFullOnboardingMutation,
} from '../../full-onboarding/queries';
import {
  useGetQuickOnboardingQuery,
  useUpdateQuickOnboardingMutation,
} from '../../quick-onboarding/queries';
import { useGetEmployeeByIdQuery } from '../queries';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);

  const { data: employeeData, isLoading: isEmployeeLoading } =
    useGetEmployeeByIdQuery(employeeId);

  const handleBack = useCallback(() => {
    navigate('/employee-management/manage-employees');
  }, [navigate]);

  if (isEmployeeLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (!employeeData) {
    return <div>Employee not found</div>;
  }

  if (employeeData.profileStepStatusId === 1) {
    return (
      <QuickOnboardingEditWrapper
        employeeId={employeeId}
        handleBack={handleBack}
      />
    );
  }

  return (
    <FullOnboardingEditWrapper
      employeeId={employeeId}
      handleBack={handleBack}
    />
  );
}

function QuickOnboardingEditWrapper({
  employeeId,
  handleBack,
}: {
  employeeId: number;
  handleBack: () => void;
}) {
  const { data, isLoading } = useGetQuickOnboardingQuery(employeeId);
  const { mutateAsync, isPending } =
    useUpdateQuickOnboardingMutation(employeeId);

  async function handleSubmit(
    formData: EmployeeManagement.QuickOnboardingForm
  ) {
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
    return <div>Employee data not found</div>;
  }

  return (
    <FormPage title="Edit Quick Onboarding">
      <QuickOnboardingForm
        initialData={data}
        onSubmit={handleSubmit}
        onCancel={handleBack}
        isSaving={isPending}
      />
    </FormPage>
  );
}

function FullOnboardingEditWrapper({
  employeeId,
  handleBack,
}: {
  employeeId: number;
  handleBack: () => void;
}) {
  const { data, isLoading } = useGetFullOnboardingQuery(employeeId);
  const { mutateAsync, isPending } =
    useUpdateFullOnboardingMutation(employeeId);

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
    return <div>Employee data not found</div>;
  }

  return (
    <FormPage title="Edit Full Onboarding">
      <FullOnboardingForm
        fetchData={data}
        onSubmit={handleSubmit}
        isSaving={isPending}
      />
    </FormPage>
  );
}
