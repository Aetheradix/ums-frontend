import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { masterUrls } from '../../../urls';
import ClassForm from '../components/ClassForm';
import { useClassQuery, useUpdateClassMutation } from '../queries';

const DEFAULT = {
  name: '',
  code: '',
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateClassMutation(id);
  const { data = DEFAULT, isLoading } = useClassQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.class.root);
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  async function handleSubmit(data: Master.HR.ClassForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Class updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update class');
    }
  }

  return (
    <FormPage title="Edit Class" description="Update the class details.">
      <FormCard title="Class Details">
        <ClassForm
          fetchData={data}
          isSaving={isPending}
          isEditMode
          onSubmit={handleSubmit}
        />
      </FormCard>
    </FormPage>
  );
}
