import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from '../../../../../services';
import { Loader } from '../../../../../shared/components/progress';
import { useParamsId } from '../../../../../shared/hooks/params';
import { FormCard, FormPage } from '../../../../../shared/new-components';
import { masterUrls } from '../../../urls';
import UserRoleMappingForm from '../components/UserRoleMappingForm';
import {
  useUpdateUserRoleMappingMutation,
  useUserRoleMappingQuery,
} from '../queries';

const DEFAULT: Master.UserManagement.UserRoleMappingForm = {
  UserId: '',
  RoleName: '',
};

export default function Create() {
  const navigate = useNavigate();
  const id = Number(useParamsId());
  const { mutateAsync, isPending } = useUpdateUserRoleMappingMutation(id);
  const { data = DEFAULT, isLoading } = useUserRoleMappingQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.userRoleMapping.root);
  }, [navigate]);

  async function handleSubmit(
    formData: Master.UserManagement.UserRoleMappingForm
  ) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Mapping saved successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to save mapping');
    }
  }

  return (
    <FormPage
      title="Edit mapping"
      description="Update the details of the mapping."
    >
      <FormCard title="User Details">
        {isLoading ? (
          <Loader />
        ) : (
          <UserRoleMappingForm
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
