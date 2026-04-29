import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import CollegeCategoryForm from '../components/CollegeCategoryForm';
import { useCreateCollegeCategoryMutation } from '../queries';

interface Props {
  onSave: () => void;
}

function CreateModalContent(props: Props) {
  const { mutateAsync, isPending } = useCreateCollegeCategoryMutation();

  async function handleSubmit(data: CollegeMaster.CollegeCategoryForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('College Category created successfully.');
        props.onSave();
      }
    } catch {
      ToastService.error('Failed to create college category');
    }
  }
  return <CollegeCategoryForm onSubmit={handleSubmit} isSaving={isPending} />;
}

export default function Create() {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal header="Create College Category" onHide={handleBack} visible>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
