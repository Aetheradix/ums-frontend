import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseModeOfEducationForm from '../components/CourseModeOfEducationForm';
import {
  useCourseModeOfEducationQuery,
  useUpdateCourseModeOfEducationMutation,
} from '../queries';

const DEFAULT: CourseMaster.CourseModeOfEducationForm = {
  code: '',
  name: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = Number(useParamsId());
  const { mutateAsync, isPending } = useUpdateCourseModeOfEducationMutation(id);
  const { data = DEFAULT, isLoading } = useCourseModeOfEducationQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseModeOfEducation.root);
  }, [navigate]);

  async function handleSubmit(
    formData: CourseMaster.CourseModeOfEducationForm
  ) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Department updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update course department');
    }
  }

  return (
    <FormPage
      title="Edit Course Department"
      description="Update the details of the course department."
    >
      <FormCard title="Department Details">
        {isLoading ? (
          <Loader />
        ) : (
          <CourseModeOfEducationForm
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
