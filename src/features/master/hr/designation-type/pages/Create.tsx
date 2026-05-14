import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import DesignationTypeForm from '../components/DesignationTypeForm';
import { useCreateDesignationTypeMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateDesignationTypeMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.designationType.root);
  }, [navigate]);

  async function handleSubmit(data: Master.HR.DesignationTypeForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Designation Type created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create designation type');
    }
  }

  return (
    <FormPage
      title="Create Designation Type"
      description="Fill in the details to add a new designation type."
    >
      <FormCard title="Designation Type Details">
        <DesignationTypeForm
          onSubmit={handleSubmit}
          isSaving={isPending}
          isEditMode={false}
        />
      </FormCard>
    </FormPage>
  );
}
