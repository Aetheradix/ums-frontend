import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseLevelForm from '../components/CourseLevelForm';
import { useCreateCourseLevelMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateCourseLevelMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseLevel.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.CourseLevelForm) {
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
        <CourseLevelForm onSubmit={handleSubmit} isSaving={isPending} />
      </FormCard>
    </FormPage>
  );
}
