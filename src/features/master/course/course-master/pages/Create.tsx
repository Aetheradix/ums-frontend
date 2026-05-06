import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseMasterForm from '../components/CourseMasterForm';
import { useCreateCourseMasterMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCourseMasterMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseMaster.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.CourseMasterForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Course created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create course');
    }
  }

  return (
    <FormPage
      title="Create Course"
      description="Fill in the details to add a new course."
    >
      <FormCard title="Course Details">
        <CourseMasterForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
