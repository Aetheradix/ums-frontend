import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import StateForm from '../components/StateForm';
import { useCreateStateMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateStateMutation();

  async function handleSubmit(data: Master.StateForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('State created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create state.');
    }
  }

  return <StateForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create State" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
