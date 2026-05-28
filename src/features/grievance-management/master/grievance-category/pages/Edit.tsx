import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import GrievanceCategoryForm from '../components/GrievanceCategoryForm';
import {
  useGrievanceCategoryQuery,
  useUpdateGrievanceCategoryMutation,
} from '../queries';

const DEFAULT = {
  name: '',
  grievanceTypeId: 0,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateGrievanceCategoryMutation(id);
  const { data = DEFAULT, isLoading } = useGrievanceCategoryQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.grievanceCategory.root);
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  async function handleSubmit(data: Grievance.GrievanceCategoryForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Grievance Category updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update grievance category');
    }
  }

  return (
    <FormPage
      title="Edit Grievance Category"
      description="Update the grievance category details."
    >
      <FormCard title="Grievance Category Details">
        <GrievanceCategoryForm
          fetchData={data}
          isSaving={isPending}
          isEditMode
          onSubmit={handleSubmit}
        />
      </FormCard>
    </FormPage>
  );
}
