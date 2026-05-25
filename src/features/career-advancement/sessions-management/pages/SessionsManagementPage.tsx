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
import SessionForm from '../components/SessionForm';
import {
  useSessionsQuery,
  useSessionQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useSessionActiveStatusMutation,
} from '../queries';
import type { SessionFormData, SessionResponseDto } from '../types';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function SessionsManagementPage() {
  const { data, isLoading } = useSessionsQuery();
  const { mutateAsync: toggleStatus } = useSessionActiveStatusMutation();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const handleToggleStatus = async (item: SessionResponseDto) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Sessions Management"
      description="Manage assessment sessions for career advancement programs."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={(session: SessionResponseDto) =>
            setPopup({ mode: 'edit', id: session.id })
          }
          columns={[
            {
              cell: (_: SessionResponseDto, option: { rowIndex: number }) => (
                <span>{option.rowIndex + 1}</span>
              ),
              width: '30px',
            },
            { field: 'sessionName', header: 'Session Name' },
            { field: 'sessionType', header: 'Type' },
            { field: 'appStatus', header: 'App Status' },
            {
              field: 'isActive',
              header: 'Active',
              sortable: false,
              cell: (item: SessionResponseDto) => (
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
        title="Create Session"
        subtitle="Fill in the details to add a new session."
      >
        <CreateContent onClose={closePopup} />
      </FormPopup>

      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Session"
        subtitle="Update the session details."
      >
        {popup.mode === 'edit' && (
          <EditContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

function CreateContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateSessionMutation();

  async function handleSubmit(data: SessionFormData) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Session created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create session');
    }
  }

  return (
    <SessionForm
      onSubmit={handleSubmit}
      isSaving={isPending}
      isEditMode={false}
    />
  );
}

function EditContent({ id, onClose }: { id: number; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateSessionMutation(id);
  const { data, isLoading } = useSessionQuery(id);

  const DEFAULT: SessionFormData = {
    sessionName: '',
    sessionType: '',
    startDateTime: '',
    endDateTime: '',
    appStatus: '',
    sessionFrom: '',
    sessionTo: '',
  };

  if (isLoading) return <Loader />;

  async function handleSubmit(formData: SessionFormData) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Session updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update session');
    }
  }

  return (
    <SessionForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
