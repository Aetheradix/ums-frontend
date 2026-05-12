import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import ProgrammeModeOfEducationForm from '../components/ProgrammeModeOfEducationForm';
import { useCreateProgrammeModeOfEducationMutation } from '../queries';

export default function Create() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } =
    useCreateProgrammeModeOfEducationMutation();

  const handleBack = useCallback(() => {
    navigate(masterUrls.ProgrammeModeOfEducation.root);
  }, [navigate]);

  async function handleSubmit(data: CourseMaster.ProgrammeModeOfEducationForm) {
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
        <ProgrammeModeOfEducationForm
          onSubmit={handleSubmit}
          isSaving={isPending}
        />
      </FormCard>
    </FormPage>
  );
}
