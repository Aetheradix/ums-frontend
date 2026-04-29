import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import CollegeCategoryForm from '../components/CollegeCategoryForm';
import { useCollegeCategoryQuery, useUpdateCollegeCategoryMutation } from '../queries';

const DEFAULT = {
  name: '',
  collegeTypeId: 0,
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateCollegeCategoryMutation(id);
  const { data = DEFAULT, isLoading } = useCollegeCategoryQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CollegeCategoryForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('College Category updated successfully.');
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
    <Modal header="Edit College Category" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
