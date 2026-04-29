import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import DesignationForm from '../components/DesignationForm';
import { useCreateDesignationMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateDesignationMutation();

  async function handleSubmit(data: Master.DesignationForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Designation created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create designation');
    }
  }
  return <DesignationForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create Designation" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
