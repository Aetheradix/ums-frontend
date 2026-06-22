import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import {
  useDepartmentGroupQuery,
  useUpdateDepartmentGroupMutation,
} from '../queries';
import DepartmentGroupForm from './DepartmentGroupForm';

interface EditProps {
  id: number;
  onClose: () => void;
}

export default function EditDepartmentGroup({ id, onClose }: EditProps) {
  const { mutateAsync, isPending } = useUpdateDepartmentGroupMutation(id);

  const { data, isLoading } = useDepartmentGroupQuery(id);

  const DEFAULT: Master.Employee.DepartmentGroupForm = {
    departmentGroupTypeId: 0,
    name: '',
    code: '',
    isActive: true,
  };

  async function handleSubmit(data: Master.Employee.DepartmentGroupForm) {
    try {
      const result = await mutateAsync(data);

      if (result) {
        ToastService.success('Department group updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update department group.');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <DepartmentGroupForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
