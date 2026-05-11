import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import NationalityForm from '../components/NationalityForm';
import { useCreateNationalityMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateNationalityMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.Nationality.root);
  }, [navigate]);

  async function handleSubmit(data: Master.Other.NationalityForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Nationality created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create nationality.');
    }
  }

  return (
    <FormPage
      title="Create Nationality"
      description="Fill in the details to add a new nationality."
    >
      <FormCard title="Nationality Details">
        <NationalityForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
