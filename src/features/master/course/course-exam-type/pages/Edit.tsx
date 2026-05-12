import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseExamTypeForm from '../components/CourseExamTypeForm';
import {
  useCourseExamTypeQuery,
  useUpdateCourseExamTypeMutation,
} from '../queries';

const DEFAULT: CourseMaster.CourseExamTypeForm = {
  code: '',
  name: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = Number(useParamsId());
  const { mutateAsync, isPending } = useUpdateCourseExamTypeMutation(id);
  const { data = DEFAULT, isLoading } = useCourseExamTypeQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseExamType.root);
  }, [navigate]);

  async function handleSubmit(formData: CourseMaster.CourseExamTypeForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Exam Type updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update course Exam Type');
    }
  }

  return (
    <FormPage
      title="Edit Course Exam Type"
      description="Update the details of the course Exam Type."
    >
      <FormCard title="Exam Type Details">
        {isLoading ? (
          <Loader />
        ) : (
          <CourseExamTypeForm
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
