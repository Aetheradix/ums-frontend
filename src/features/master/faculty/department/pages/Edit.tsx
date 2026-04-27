import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import DepartmentForm from '../components/DepartmentForm';
import { useDepartmentQuery, useUpdateDepartmentMutation } from '../queries';

const DEFAULT = {
  code: '',
  name: '',
  officeTypeId: 0,
  hodName: '',
  contactNumber: 0,
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateDepartmentMutation(id);
  const { data = DEFAULT, isLoading } = useDepartmentQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DepartmentForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('Department updated successfully.');
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
    <Modal header="Edit Department" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
