import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import ClassForm from '../components/ClassForm';
import { useCreateClassMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateClassMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.class.root);
  }, [navigate]);

  async function handleSubmit(data: Master.HR.ClassForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Class created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create class');
    }
  }

  return (
    <FormPage
      title="Create Class"
      description="Fill in the details to add a new class."
    >
      <FormCard title="Class Details">
        <ClassForm
          onSubmit={handleSubmit}
          isSaving={isPending}
          isEditMode={false}
        />
      </FormCard>
    </FormPage>
  );
}
