import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { masterUrls } from '../../../urls';
import AcademicYearForm from '../components/AcademicYearForm';
import {
  useAcademicYearQuery,
  useUpdateAcademicYearMutation,
} from '../queries';

const DEFAULT: Master.AcademicYearForm = {
  name: '',
  code: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateAcademicYearMutation(id);
  const { data = DEFAULT, isLoading } = useAcademicYearQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.academicYear.root);
  }, [navigate]);

  async function handleSubmit(formData: Master.AcademicYearForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Academic Year updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update academic year');
    }
  }

  return (
    <FormPage
      title="Edit Academic Year"
      description="Update the details of the academic year."
    >
      <FormCard title="Academic Year Details">
        {isLoading ? (
          <Loader />
        ) : (
          <AcademicYearForm
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
