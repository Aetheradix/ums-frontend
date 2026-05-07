import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from '../../../../../services';
import { Loader } from '../../../../../shared/components/progress';
import { useParamsId } from '../../../../../shared/hooks/params';
import { FormCard, FormPage } from '../../../../../shared/new-components';
import { masterUrls } from '../../../urls';
import UserForm from '../components/userform';
import { useUpdateUserMutation, useUserQuery } from '../queries';

const DEFAULT: Master.UserManagement.UserForm = {
  UserName: '',
  Email: '',
  Password: '',
  PhoneNumber: '',
};

export default function Create() {
  const navigate = useNavigate();
  const id = useParamsId('id').toString();
  const { mutateAsync, isPending } = useUpdateUserMutation(id);
  const { data = DEFAULT, isLoading } = useUserQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.user.root);
  }, [navigate]);

  async function handleSubmit(formData: Master.UserManagement.UserForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('User saved successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to save User');
    }
  }

  return (
    <FormPage title="Edit User" description="Update the details of the user.">
      <FormCard title="User Details">
        {isLoading ? (
          <Loader />
        ) : (
          <UserForm
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
