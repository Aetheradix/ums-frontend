import { useCallback, useState } from 'react';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import { ToastService } from 'services';
import UserAssignmentForm from '../components/UserAssignmentForm';
import {
  useCreateUserAssignmentMutation,
  useUserAssignmentsQuery,
  useUpdateUserAssignmentMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; item: UserManagement.UserAssignmentList };

export default function List() {
  const { data, isLoading } = useUserAssignmentsQuery();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="User Assignments"
      description="Manage user assignments in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}

        <GridPanel
          data={data ?? []}
          onEdit={item => setPopup({ mode: 'edit', item })}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'userName', header: 'User' },
            { field: 'roleName', header: 'Role' },
            { field: 'domain', header: 'Domain' },
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

      {/* Create Popup */}
      <FormPopup
        visible={popup.mode === 'create'}
        onHide={closePopup}
        title="Create User Assignment"
        subtitle="Fill in the details to assign a user to a role."
      >
        <CreateUserAssignmentContent onClose={closePopup} />
      </FormPopup>

      {/* Edit Popup */}
      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit User Assignment"
        subtitle="Update the role assignment details."
      >
        {popup.mode === 'edit' && (
          <EditUserAssignmentContent item={popup.item} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

/* ── Inline Create Content ── */
function CreateUserAssignmentContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateUserAssignmentMutation();

  async function handleSubmit(data: UserManagement.UserAssignmentForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('User assigned successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to assign user');
    }
  }

  return <UserAssignmentForm onSubmit={handleSubmit} isSaving={isPending} />;
}

/* ── Inline Edit Content ── */
function EditUserAssignmentContent({
  item,
  onClose,
}: {
  item: UserManagement.UserAssignmentList;
  onClose: () => void;
}) {
  const { mutateAsync, isPending } = useUpdateUserAssignmentMutation();

  async function handleSubmit(formData: UserManagement.UserAssignmentForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('User assignment updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update user assignment');
    }
  }

  return (
    <UserAssignmentForm
      fetchData={() => Promise.resolve(item)}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
