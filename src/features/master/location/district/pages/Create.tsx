import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import DistrictForm from '../components/DistrictForm';
import { useCreateDistrictMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateDistrictMutation();

  async function handleSubmit(data: Master.DistrictForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('District created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create district.');
    }
  }

  return <DistrictForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create District" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
