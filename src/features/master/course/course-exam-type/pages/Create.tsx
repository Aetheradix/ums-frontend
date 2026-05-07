import { masterUrls } from 'features/master/urls';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import CourseExamTypeForm from '../components/CourseExamTypeForm';
import { useCreateCourseExamTypeMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCourseExamTypeMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseExamType.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.CourseExamTypeForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Course Level created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create course level');
    }
  }

  return (
    <FormPage
      title="Create Course Level"
      description="Fill in the details to add a new course level."
    >
      <FormCard title="Level Details">
        <CourseExamTypeForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
