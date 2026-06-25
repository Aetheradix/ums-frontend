import { ToastService } from 'services';
import { useCreateDepartmentGroupTypeMutation } from '../queries';
import DepartmentGroupTypeForm from './DepartmentGroupTypeForm';

interface CreateDepartmentGroupTypeProps {
  onClose: () => void;
}

export default function CreateDepartmentGroupType({
  onClose,
}: CreateDepartmentGroupTypeProps) {
  const { mutateAsync, isPending } = useCreateDepartmentGroupTypeMutation();

  async function handleSubmit(data: Master.Employee.DepartmentGroupTypeForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Department group type created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create department group type.');
    }
  }

  return (
    <DepartmentGroupTypeForm onSubmit={handleSubmit} isSaving={isPending} />
  );
}
