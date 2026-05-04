import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { masterUrls } from '../../../urls';
import CourseDepartmentForm from '../components/CourseDepartmentForm';
import {
  useCourseDepartmentQuery,
  useUpdateCourseDepartmentMutation,
} from '../queries';

const DEFAULT: CourseMaster.CourseDepartmentForm = {
  code: '',
  name: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateCourseDepartmentMutation(id);
  const { data = DEFAULT, isLoading } = useCourseDepartmentQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseDepartment.root);
  }, [navigate]);

  async function handleSubmit(formData: CourseMaster.CourseDepartmentForm) {
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
          <CourseDepartmentForm
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
