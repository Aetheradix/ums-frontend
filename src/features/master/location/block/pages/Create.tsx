import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import BlockForm from '../components/BlockForm';
import { useCreateBlockMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateBlockMutation();

  async function handleSubmit(data: Master.BlockForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Block created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create block.');
    }
  }

  return <BlockForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create Block" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
