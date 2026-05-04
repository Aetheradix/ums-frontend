import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseDepartmentForm from '../components/CourseDepartmentForm';
import { useCreateCourseDepartmentMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCourseDepartmentMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseDepartment.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.CourseDepartmentForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Course Department created successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to create course department');
    }
  }

  return (
    <FormPage
      title="Create Course Department"
      description="Fill in the details to add a new course department."
    >
      <FormCard title="Department Details">
        <CourseDepartmentForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
