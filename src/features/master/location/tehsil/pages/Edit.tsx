import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import TehsilForm from '../components/TehsilForm';
import { useTehsilQuery, useUpdateTehsilMutation } from '../queries';

const DEFAULT: Master.TehsilForm = {
  code: '',
  name: '',
  districtId: 0,
  isActive: true,
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateTehsilMutation(id);
  const { data = DEFAULT, isLoading } = useTehsilQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TehsilForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('Tehsil updated successfully.');
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
    <Modal header="Edit Tehsil" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
