import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import ProgrammeModeOfEducationForm from '../components/ProgrammeModeOfEducationForm';
import {
  useProgrammeModeOfEducationQuery,
  useUpdateProgrammeModeOfEducationMutation,
} from '../queries';

const DEFAULT: SubjectMaster.ProgrammeModeOfEducationForm = {
  code: '',
  name: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } =
    useUpdateProgrammeModeOfEducationMutation(id);
  const { data = DEFAULT, isLoading } = useProgrammeModeOfEducationQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.ProgrammeModeOfEducation.root);
  }, [navigate]);

  async function handleSubmit(
    formData: SubjectMaster.ProgrammeModeOfEducationForm
  ) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Department updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update course department');
    }
  }

  return (
    <FormPage
      title="Edit Course Department"
      description="Update the details of the course department."
    >
      <FormCard title="Department Details">
        {isLoading ? (
          <Loader />
        ) : (
          <ProgrammeModeOfEducationForm
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
