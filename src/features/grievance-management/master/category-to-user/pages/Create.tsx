import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import CategoryToUserMappingForm from '../components/CategoryToUserMappingForm';
import { useCreateCategoryToUserMappingMutation } from '../queries';

function CreateModalContent(props: Forms.Props) {
  const { mutateAsync, isPending } = useCreateCategoryToUserMappingMutation();

  async function handleSubmit(data: Grievance.CategoryToUserMappingForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Category-user Mapping created successfully.');
        props.onSave();
        return;
      }
      ToastService.error('Failed to create category-User Mapping.');
    } catch {
      ToastService.error('Failed to create category-User Mapping.');
    }
  }

  return (
    <CategoryToUserMappingForm onSubmit={handleSubmit} isSaving={isPending} />
  );
}

export default function Create() {
  const navigate = useNavigate();

  const handleBack = useCallback(
    () => navigate('category-to-user'),
    [navigate]
  );

  return (
    <Modal onHide={handleBack} visible={true}>
      <CreateModalContent onSave={handleBack} />
    </Modal>
  );
}
