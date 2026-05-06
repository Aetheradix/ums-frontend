import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseModeOfEducationForm from '../components/CourseModeOfEducationForm';
import { useCreateCourseModeOfEducationMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCourseModeOfEducationMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseModeOfEducation.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.CourseModeOfEducationForm) {
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
        <CourseModeOfEducationForm
          onSubmit={handleSubmit}
          isSaving={isPending}
        />
      </FormCard>
    </FormPage>
  );
}
