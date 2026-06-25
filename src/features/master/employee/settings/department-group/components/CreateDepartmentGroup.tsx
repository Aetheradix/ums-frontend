import { ToastService } from 'services';
import { useCreateDepartmentGroupMutation } from '../queries';
import DepartmentGroupForm from './DepartmentGroupForm';

interface CreateProps {
  onClose: () => void;
}

export default function CreateDepartmentGroup({ onClose }: CreateProps) {
  const { mutateAsync, isPending } = useCreateDepartmentGroupMutation();

  async function handleSubmit(data: Master.Employee.DepartmentGroupForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Department group created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create department group.');
    }
  }

  return <DepartmentGroupForm onSubmit={handleSubmit} isSaving={isPending} />;
}
