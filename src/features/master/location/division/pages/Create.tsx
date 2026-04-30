import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import DivisionForm from '../components/DivisionForm';
import { useCreateDivisionMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateDivisionMutation();

  async function handleSubmit(data: Master.DivisionForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Division created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create division.');
    }
  }

  return <DivisionForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create Division" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
