import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { masterUrls } from '../../../urls';
import DesignationTypeForm from '../components/DesignationTypeForm';
import {
  useDesignationTypeQuery,
  useUpdateDesignationTypeMutation,
} from '../queries';

const DEFAULT = {
  name: '',
  code: '',
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateDesignationTypeMutation(id);
  const { data = DEFAULT, isLoading } = useDesignationTypeQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.designationType.root);
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  async function handleSubmit(data: Master.HR.DesignationTypeForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Designation Type updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update designation type');
    }
  }

  return (
    <FormPage
      title="Edit Designation Type"
      description="Update the designation type details."
    >
      <FormCard title="Designation Type Details">
        <DesignationTypeForm
          fetchData={data}
          isSaving={isPending}
          isEditMode
          onSubmit={handleSubmit}
        />
      </FormCard>
    </FormPage>
  );
}
