import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import OfficeTypeForm from '../components/OfficeTypeForm';
import { useCreateOfficeTypeMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateOfficeTypeMutation();

  async function handleSubmit(data: OfficeTypeMaster.OfficeTypeForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Office Type created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create office type');
    }
  }
  return <OfficeTypeForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create Office Type  " onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
