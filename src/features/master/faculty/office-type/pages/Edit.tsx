import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import OfficeTypeForm from '../components/OfficeTypeForm';
import { useOfficeTypeQuery, useUpdateOfficeTypeMutation } from '../queries';

const DEFAULT = {
  code: '',
  name: '',
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateOfficeTypeMutation(id);
  const { data = DEFAULT, isLoading } = useOfficeTypeQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <OfficeTypeForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('Office Type updated successfully.');
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
    <Modal header="Edit Office Type" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
