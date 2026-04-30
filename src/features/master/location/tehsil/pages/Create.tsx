import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import TehsilForm from '../components/TehsilForm';
import { useCreateTehsilMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateTehsilMutation();

  async function handleSubmit(data: Master.TehsilForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Tehsil created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create tehsil.');
    }
  }

  return <TehsilForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create Tehsil" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
