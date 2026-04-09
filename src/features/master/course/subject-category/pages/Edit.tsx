import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import SubjectCategoryCourseForm from '../components/SubjectCategoryForm';
import {
  useSubjectCategoryQuery,
  useUpdateSubjectCategoryMutation,
} from '../queries';

const DEFAULT = {
  categoryCode: '',
  categoryName: '',
  categoryNameHindi: '',
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateSubjectCategoryMutation(id);
  const { data = DEFAULT, isLoading } = useSubjectCategoryQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SubjectCategoryCourseForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('Subject Category updated successfully.');
          props.onSave();
        }
      }}
    />
  );
}

export default function Edit() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Edit Subject Category" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
