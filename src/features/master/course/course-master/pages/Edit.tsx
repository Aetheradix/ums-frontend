import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import { masterUrls } from '../../../urls';
import CourseMasterForm from '../components/CourseMasterForm';
import {
  useCourseMasterQuery,
  useUpdateCourseMasterMutation,
} from '../queries';

const DEFAULT: CourseMaster.CourseMasterForm = {
  code: '',
  name: '',
  levelId: 0,
  departmentId: 0,
  streamId: 0,
  modeId: 0,
  tenureId: 0,
  examTypeId: 0,
  totalTerms: 0,
  description: '',
  isActive: true,
};

export default function Edit() {
  const navigate = useNavigate();
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateCourseMasterMutation(id);
  const { data = DEFAULT, isLoading } = useCourseMasterQuery(id);

  const handleBack = useCallback(() => {
    navigate(masterUrls.courseMaster.root);
  }, [navigate]);

  async function handleSubmit(formData: CourseMaster.CourseMasterForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Course updated successfully.');
        handleBack();
      }
    } catch {
      ToastService.error('Failed to update course');
    }
  }

  return (
    <FormPage
      title="Edit Course"
      description="Update the details of the course."
    >
      <FormCard title="Course Details">
        {isLoading ? (
          <Loader />
        ) : (
          <CourseMasterForm
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
