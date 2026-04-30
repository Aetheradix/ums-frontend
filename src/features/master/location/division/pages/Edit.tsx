import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import { useParamsId } from 'shared/hooks/params';
import DivisionForm from '../components/DivisionForm';
import { useDivisionQuery, useUpdateDivisionMutation } from '../queries';

const DEFAULT: Master.DivisionForm = {
  code: '',
  name: '',
  stateId: 0,
  isActive: true,
};

interface Props {
  onSave: () => void;
}

function EditModalContent(props: Props) {
  const id = useParamsId();
  const { mutateAsync, isPending } = useUpdateDivisionMutation(id);
  const { data = DEFAULT, isLoading } = useDivisionQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DivisionForm
      fetchData={data}
      isSaving={isPending}
      isEditMode
      onSubmit={async data => {
        const result = await mutateAsync(data);
        if (result) {
          ToastService.success('Division updated successfully.');
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
    <Modal header="Edit Division" onHide={handleBack} visible>
      <EditModalContent onSave={handleBack} />
    </Modal>
  );
}
