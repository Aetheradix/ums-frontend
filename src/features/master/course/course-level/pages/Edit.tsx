import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseLevelForm from '../components/CourseLevelForm';
import { useCourseLevelQuery, useUpdateCourseLevelMutation } from '../queries';
const DEFAULT: CourseMaster.CourseLevelForm = {
  code: '',
  name: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateCourseLevelMutation(id);
  const { data = DEFAULT, isLoading } = useCourseLevelQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseLevel.root);
  }, [navigate]);

  async function handleSubmit(formData: CourseMaster.CourseLevelForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Level updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update course Level');
    }
  }

  return (
    <FormPage
      title="Edit Course Level"
      description="Update the details of the course Level."
    >
      <FormCard title="Level Details">
        {isLoading ? (
          <Loader />
        ) : (
          <CourseLevelForm
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
