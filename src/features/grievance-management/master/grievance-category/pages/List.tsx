import { useCallback, useState } from 'react';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import GrievanceCategoryForm from '../components/GrievanceCategoryForm';

import { useCategoryTypeQuery } from 'features/grievance-management/other/category-type/queries';
import {
  useCreateGrievanceCategoryMutation,
  useGrievanceCategoriesQuery,
  useGrievanceCategoryActiveStatusMutation,
  useGrievanceCategoryQuery,
  useUpdateGrievanceCategoryMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function GrievanceCategoryList() {
  const { data, isLoading } = useGrievanceCategoriesQuery();
  const { data: grievanceCategoryTypes = [] } = useCategoryTypeQuery();
  const { mutateAsync: toggleStatus } =
    useGrievanceCategoryActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: Grievance.GrievanceCategoryItem) => {
    await toggleStatus({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const getGrievanceTypeName = (categoryType: string) => {
    debugger;
    return (
      grievanceCategoryTypes.find(
        (gt: { id: string }) => gt.id === categoryType
      )?.text || '-'
    );
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Categories List"
      //description="Manage the list of all grievance categories in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={grievanceCategory =>
            setPopup({ mode: 'edit', id: grievanceCategory.id })
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            {
              header: 'Grievance Type',
              cell: (item: Grievance.GrievanceCategoryItem) => (
                <span>{getGrievanceTypeName(item.categoryType)}</span>
              ),
            },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Grievance.GrievanceCategoryItem) => (
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
        title="Create Grievance Category"
        subtitle="Fill in the details to add a new grievance category."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Grievance Category"
        subtitle="Update the grievance category details."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateGrievanceCategoryMutation();

  async function handleSubmit(data: Grievance.GrievanceCategoryForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Grievance Category created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create grievance category');
    }
  }

  return (
    <GrievanceCategoryForm
      onSubmit={handleSubmit}
      isSaving={isPending}
      isEditMode={false}
    />
  );
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateGrievanceCategoryMutation(id);
  const { data, isLoading } = useGrievanceCategoryQuery(id);
  const DEFAULT = { name: '', categoryType: '' };

  if (isLoading) return <Loader />;

  async function handleSubmit(formData: Grievance.GrievanceCategoryForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Grievance Category updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update grievance category');
    }
  }

  return (
    <GrievanceCategoryForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
