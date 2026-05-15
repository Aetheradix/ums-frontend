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
import DesignationForm from '../components/DesignationForm';
import {
  useDesignationActiveStatusMutation,
  useDesignationQuery,
  useDesignationsQuery,
  useCreateDesignationMutation,
  useUpdateDesignationMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useDesignationsQuery();
  const { mutateAsync: toggleStatus } = useDesignationActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: Master.HR.DesignationItem) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Designation Master"
      description="Manage the list of all designations in the system."
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
            { field: 'sequenceNumber', header: 'Sequence' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.HR.DesignationItem) => (
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
        title="Create Designation"
        subtitle="Fill in the details to add a new designation."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Designation"
        subtitle="Update the designation details."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateDesignationMutation();

  async function handleSubmit(data: Master.HR.DesignationForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Designation created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create designation');
    }
  }

  return (
    <DesignationForm
      onSubmit={handleSubmit}
      isSaving={isPending}
      isEditMode={false}
    />
  );
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateDesignationMutation(id);
  const { data, isLoading } = useDesignationQuery(id);
  const DEFAULT = {
    classId: 0,
    postId: 0,
    designationTypeId: 0,
    name: '',
    code: '',
    sequenceNumber: 0,
  };

  if (isLoading) return <Loader />;

  async function handleSubmit(formData: Master.HR.DesignationForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Designation updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update designation');
    }
  }

  return (
    <DesignationForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
