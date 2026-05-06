import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { FormCard, FormPage } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import CourseTenureForm from '../components/CourseTenureForm';
import {
  useCourseTenureQuery,
  useUpdateCourseTenureMutation,
} from '../queries';

const DEFAULT: CourseMaster.CourseTenureForm = {
  code: '',
  name: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateCourseTenureMutation(id);
  const { data = DEFAULT, isLoading } = useCourseTenureQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseTenure.root);
  }, [navigate]);

  async function handleSubmit(formData: CourseMaster.CourseTenureForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course Tenure updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update course Tenure');
    }
  }

  return (
    <FormPage
      title="Edit Course Tenure"
      description="Update the details of the course Tenure."
    >
      <FormCard title="Tenure Details">
        {isLoading ? (
          <Loader />
        ) : (
          <CourseTenureForm
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
