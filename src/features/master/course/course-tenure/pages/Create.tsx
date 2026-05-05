import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseTenureForm from '../components/CourseTenureForm';
import { useCreateCourseTenureMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCourseTenureMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseTenure.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.CourseTenureForm) {
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
        <CourseTenureForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
