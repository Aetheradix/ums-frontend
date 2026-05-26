import { ToastService } from 'services';
import { useCreateSeparationReasonTypeMutation } from '../queries';
import SeparationReasonTypeForm from './SeparationReasonTypeForm';

interface CreateProps {
  onClose: () => void;
}

export default function CreateSeparationReasonType({ onClose }: CreateProps) {
  const { mutateAsync, isPending } = useCreateSeparationReasonTypeMutation();

  async function handleSubmit(data: Master.Employee.SeparationReasonTypeForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Separation reason created successfully.');

        onClose();
      }
    } catch {
      ToastService.error('Failed to create separation reason.');
    }
  }

  return (
    <SeparationReasonTypeForm onSubmit={handleSubmit} isSaving={isPending} />
  );
}
