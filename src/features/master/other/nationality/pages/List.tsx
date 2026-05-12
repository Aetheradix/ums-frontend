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
import NationalityForm from '../components/NationalityForm';
import {
  useCreateNationalityMutation,
  useNationalitiesQuery,
  useNationalityActiveStatusMutation,
  useNationalityQuery,
  useUpdateNationalityMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useNationalitiesQuery();
  const { mutateAsync: toggleStatus } = useNationalityActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: Master.Other.NationalityItem) => {
    await toggleStatus({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Nationality"
      description="Manage the list of all nationalities in the system."
    >
      <FormCard>
        <GridPanel
          data={data as Master.Other.NationalityItem[]}
          loading={isLoading}
          onEdit={nationality => setPopup({ mode: 'edit', id: nationality.id })}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.Other.NationalityItem) => (
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
        title="Create Nationality"
        subtitle="Fill in the details to add a new nationality."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Nationality"
        subtitle="Update the details of the nationality."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateNationalityMutation();

  async function handleSubmit(data: Master.Other.NationalityForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Nationality created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create nationality.');
    }
  }

  return <NationalityForm onSubmit={handleSubmit} isSaving={isPending} />;
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateNationalityMutation(id);
  const { data, isLoading } = useNationalityQuery(id);
  const DEFAULT = { name: '' };

  async function handleSubmit(formData: Master.Other.NationalityForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Nationality updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update nationality');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <NationalityForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
