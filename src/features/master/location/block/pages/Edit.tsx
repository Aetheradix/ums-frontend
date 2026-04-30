import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import BlockForm from '../components/BlockForm';
import { useBlockQuery, useUpdateBlockMutation } from '../queries';

const DEFAULT: Master.BlockForm = {
  code: '',
  name: '',
  districtId: 0,
  tehsilId: 0,
  isActive: true,
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateBlockMutation(id);
  const { data = DEFAULT, isLoading } = useBlockQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BlockForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('Block updated successfully.');
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
    <Modal header="Edit Block" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
