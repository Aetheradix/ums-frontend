import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import CollegeTypeForm from '../components/CollegeTypeForm';
import { useCreateCollegeTypeMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateCollegeTypeMutation();

  async function handleSubmit(data: CollegeMaster.CollegeTypeForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('College Type created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create college type');
    }
  }
  return <CollegeTypeForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create College Type" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
