import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { masterUrls } from '../../../urls';
import CourseStreamForm from '../components/CourseStreamForm';
import {
  useCourseStreamQuery,
  useUpdateCourseStreamMutation,
} from '../queries';

const DEFAULT: CourseMaster.CourseStreamForm = {
  code: '',
  name: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateCourseStreamMutation(id);
  const { data = DEFAULT, isLoading } = useCourseStreamQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseStream.root);
  }, [navigate]);

  async function handleSubmit(formData: CourseMaster.CourseStreamForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Stream updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update course stream');
    }
  }

  return (
    <FormPage
      title="Edit Course Stream"
      description="Update the details of the course stream."
    >
      <FormCard title="Stream Details">
        {isLoading ? (
          <Loader />
        ) : (
          <CourseStreamForm
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
