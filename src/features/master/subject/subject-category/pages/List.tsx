import { useCallback, useState } from 'react';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import { ToastService } from 'services';
import SubjectCategoryForm from '../components/SubjectCategoryForm';
import {
  useSubjectCategoryActiveStatusMutation,
  useSubjectCategoryQuery,
  useSubjectCategoriesQuery,
  useCreateSubjectCategoryMutation,
  useUpdateSubjectCategoryMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useSubjectCategoriesQuery();
  const { mutateAsync: toggleStatus } =
    useSubjectCategoryActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (
    item: SubjectMaster.SubjectCategoryItem
  ) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Subject Category"
      description="Manage the list of all subject categories in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={item => setPopup({ mode: 'edit', id: item.id })}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: SubjectMaster.SubjectCategoryItem) => (
                <StatusButton
                  value={item.isActive}
                  onClick={() => handleToggleStatus(item)}
                />
              ),
            },
          ]}
          toolbar={
            <Button
              label="Create"
              icon="plus"
              variant="primary"
              onClick={() => setPopup({ mode: 'create' })}
            />
          }
          searchBox
        />
      </FormCard>

      <FormPopup
        visible={popup.mode === 'create'}
        onHide={closePopup}
        title="Create Subject Category"
        subtitle="Fill in the details to add a new subject category."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Subject Category"
        subtitle="Update the details of the subject category."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateSubjectCategoryMutation();

  async function handleSubmit(data: SubjectMaster.SubjectCategoryForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Subject Category created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create subject category.');
    }
  }

  return <SubjectCategoryForm onSubmit={handleSubmit} isSaving={isPending} />;
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateSubjectCategoryMutation(id);
  const { data, isLoading } = useSubjectCategoryQuery(id);
  const DEFAULT: SubjectMaster.SubjectCategoryForm = {
    code: '',
    name: '',
    isActive: true,
  };

  async function handleSubmit(formData: SubjectMaster.SubjectCategoryForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Subject Category updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update subject category.');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <SubjectCategoryForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
