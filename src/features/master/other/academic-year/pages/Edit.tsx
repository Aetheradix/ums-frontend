import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import AcademicYearForm from '../components/AcademicYearForm';
import {
  useGetAcademicYearByIdQuery,
  useUpdateAcademicYearMutation,
} from '../queries';

const DEFAULT: Master.Other.AcademicYearForm = {
  name: '',
  session: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();

  const id = Number(useParamsId());

  const { mutateAsync, isPending } = useUpdateAcademicYearMutation(id);

  const { data = DEFAULT, isLoading } = useGetAcademicYearByIdQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.academicYear.root);
  }, [navigate]);

  if (isLoading) {
    return <Loader />;
  }

  async function handleSubmit(data: Master.Other.AcademicYearForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Academic year updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update academic year.');
    }
  }

  return (
    <FormPage
      title="Edit Academic Year"
      description="Update the details of the academic year."
    >
      <FormCard title="Academic Year Details">
        <AcademicYearForm
          fetchData={data}
          isSaving={isPending}
          isEditMode
          onSubmit={handleSubmit}
        />
      </FormCard>
    </FormPage>
  );
}
