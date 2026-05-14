import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { masterUrls } from '../../../urls';
import SectionForm from '../components/SectionForm';
import { useSectionQuery, useUpdateSectionMutation } from '../queries';

const DEFAULT = {
  name: '',
  code: '',
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateSectionMutation(id);
  const { data = DEFAULT, isLoading } = useSectionQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.section.root);
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  async function handleSubmit(data: Master.HR.SectionForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Section updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update section');
    }
  }

  return (
    <FormPage title="Edit Section" description="Update the section details.">
      <FormCard title="Section Details">
        <SectionForm
          fetchData={data}
          isSaving={isPending}
          isEditMode
          onSubmit={handleSubmit}
        />
      </FormCard>
    </FormPage>
  );
}
