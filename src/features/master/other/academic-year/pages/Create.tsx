import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import AcademicYearForm from '../components/AcademicYearForm';
import { useCreateAcademicYearMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useCreateAcademicYearMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.academicYear.root);
  }, [navigate]);

  async function handleSubmit(data: Master.Other.AcademicYearForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Academic year created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create academic year.');
    }
  }

  return (
    <FormPage
      title="Create Academic Year"
      description="Fill in the details to add a new academic year."
    >
      <FormCard title="Academic Year Details">
        <AcademicYearForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
