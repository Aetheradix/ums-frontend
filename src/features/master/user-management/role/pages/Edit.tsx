import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import RoleForm from '../components/RoleForm';
import { useRoleQuery, useUpdateRoleMutation } from '../queries';

const DEFAULT: Master.UserManagement.RoleForm = {
  name: '',
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId('id').toString();
  const { mutateAsync, isPending } = useUpdateRoleMutation(id);
  const { data = DEFAULT, isLoading } = useRoleQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.role.root);
  }, [navigate]);

  async function handleSubmit(formData: Master.UserManagement.RoleForm) {
    try {
      const result = await mutateAsync(formData);
      debugger;
      if (result) {
        ToastService.success('Role updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update role');
    }
  }

  return (
    <FormPage title="Edit Role" description="Update the details of the role.">
      <FormCard title="Role Details">
        {isLoading ? (
          <Loader />
        ) : (
          <RoleForm
            fetchData={data}
            isSaving={isPending}
            isEditMode
            onSubmit={handleSubmit}
          />
        )}
      </FormCard>
    </FormPage>
  );
}
