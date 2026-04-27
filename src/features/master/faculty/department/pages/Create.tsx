import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import DepartmentForm from '../components/DepartmentForm';
import { useCreateDepartmentMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateDepartmentMutation();

  async function handleSubmit(data: DepartmentMaster.DepartmentForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Department created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create department');
    }
  }
  return <DepartmentForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create Department" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
