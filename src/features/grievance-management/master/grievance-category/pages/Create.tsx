import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import GrievanceCategoryForm from '../components/GrievanceCategoryForm';
import { useCreateGrievanceCategoryMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateGrievanceCategoryMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.grievanceCategory.root);
  }, [navigate]);

  async function handleSubmit(
    data: GrievanceCategoryMaster.GrievanceCategoryForm
  ) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Grievance Category created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create Grievance category');
    }
  }

  return (
    <FormPage
      title="Create Grievance Category"
      description="Fill in the details to add a new Grievance category."
    >
      <FormCard title="Grievance Category Details">
        <GrievanceCategoryForm
          onSubmit={handleSubmit}
          isSaving={isPending}
          isEditMode={false}
        />
      </FormCard>
    </FormPage>
  );
}
