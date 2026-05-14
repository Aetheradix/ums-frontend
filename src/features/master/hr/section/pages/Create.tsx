import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import SectionForm from '../components/SectionForm';
import { useCreateSectionMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateSectionMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.section.root);
  }, [navigate]);

  async function handleSubmit(data: Master.HR.SectionForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Section created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create section');
    }
  }

  return (
    <FormPage
      title="Create Section"
      description="Fill in the details to add a new section."
    >
      <FormCard title="Section Details">
        <SectionForm
          onSubmit={handleSubmit}
          isSaving={isPending}
          isEditMode={false}
        />
      </FormCard>
    </FormPage>
  );
}
