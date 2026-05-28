import { useNavigate, useSearchParams } from 'react-router';
import { ToastService } from 'services';
import { Modal } from 'shared/components/popups';
import { Loader } from 'shared/components/progress';
import CategoryToUserMappingForm from '../components/CategoryToUserMappingForm';
import {
  useCategoryToUserMappingByPolicyQuery,
  useUpdateCategoryToUserMappingMutation,
} from '../queries';

export default function Edit() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const categoryId = Number(searchParams.get('roleId')) ?? 0;
  const userId = searchParams.get('userId') ?? '';

  const { data, isLoading } = useCategoryToUserMappingByPolicyQuery(
    categoryId,
    userId
  );
  const { mutateAsync, isPending } = useUpdateCategoryToUserMappingMutation({
    categoryId: categoryId ? Number(categoryId) : 0,
    userId: userId,
  });

  const handleSubmit = async (values: Grievance.CategoryToUserMappingForm) => {
    try {
      await mutateAsync(values);
      ToastService.success('Category-user mapping updated successfully');
      navigate('category-to-user');
    } catch {
      // Handled by form hook
    }
  };

  return (
    <Modal
      header="Edit Category-User Mapping"
      onHide={() => navigate('category-to-user')}
      visible
    >
      {isLoading ? (
        <Loader />
      ) : data ? (
        <CategoryToUserMappingForm
          onSubmit={handleSubmit}
          isSaving={isPending}
          fetchData={data}
        />
      ) : (
        <p>Mapping not found.</p>
      )}
    </Modal>
  );
}
