import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import {
  useGetDepartmentGroupTypeByIdQuery,
  useUpdateDepartmentGroupTypeMutation,
} from '../queries';
import DepartmentGroupTypeForm from './DepartmentGroupTypeForm';

interface EditDepartmentGroupTypeProps {
  id: number;
  onClose: () => void;
}

export default function EditDepartmentGroupType({
  id,
  onClose,
}: EditDepartmentGroupTypeProps) {
  const { mutateAsync, isPending } = useUpdateDepartmentGroupTypeMutation(id);

  const { data, isLoading } = useGetDepartmentGroupTypeByIdQuery(id);

  const DEFAULT: Master.Employee.DepartmentGroupTypeForm = {
    name: '',
    code: '',
    isActive: true,
  };

  async function handleSubmit(data: Master.Employee.DepartmentGroupTypeForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Department group type updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update department group type.');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <DepartmentGroupTypeForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
