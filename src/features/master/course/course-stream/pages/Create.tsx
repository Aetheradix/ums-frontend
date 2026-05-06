import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseStreamForm from '../components/CourseStreamForm';
import { useCreateCourseStreamMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCourseStreamMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseStream.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.CourseStreamForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Course Stream created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create course stream');
    }
  }

  return (
    <FormPage
      title="Create Course Stream"
      description="Fill in the details to add a new course stream."
    >
      <FormCard title="Stream Details">
        <CourseStreamForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
