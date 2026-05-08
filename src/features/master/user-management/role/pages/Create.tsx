import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import RoleForm from '../components/RoleForm';
import { useCreateRoleMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateRoleMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.role.root);
  }, [navigate]);

  async function handleSubmit(formData: Master.UserManagement.RoleForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Role saved successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to save role');
    }
  }

  return (
    <FormPage title="Create Role" description="Create a new role.">
      <FormCard
        title="Role Details"
        subtitle="Provide the basic information for the new role."
        icon="map"
      >
        <RoleForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
