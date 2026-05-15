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
import DesignationTypeForm from '../components/DesignationTypeForm';
import {
  useDesignationTypeActiveStatusMutation,
  useDesignationTypeQuery,
  useDesignationTypesQuery,
  useCreateDesignationTypeMutation,
  useUpdateDesignationTypeMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useDesignationTypesQuery();
  const { mutateAsync: toggleStatus } =
    useDesignationTypeActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: Master.HR.DesignationTypeItem) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Designation Type Master"
      description="Manage the list of all designation types in the system."
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
              cell: (item: Master.HR.DesignationTypeItem) => (
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
        title="Create Designation Type"
        subtitle="Fill in the details to add a new designation type."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Designation Type"
        subtitle="Update the designation type details."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateDesignationTypeMutation();

  async function handleSubmit(data: Master.HR.DesignationTypeForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Designation Type created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create designation type');
    }
  }

  return (
    <DesignationTypeForm
      onSubmit={handleSubmit}
      isSaving={isPending}
      isEditMode={false}
    />
  );
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateDesignationTypeMutation(id);
  const { data, isLoading } = useDesignationTypeQuery(id);
  const DEFAULT = { name: '', code: '' };

  if (isLoading) return <Loader />;

  async function handleSubmit(formData: Master.HR.DesignationTypeForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Designation Type updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update designation type');
    }
  }

  return (
    <DesignationTypeForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
