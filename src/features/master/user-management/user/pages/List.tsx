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
import UserForm from '../components/UserForm';
import {
  useCreateUserMutation,
  useUserQuery,
  useUsersQuery,
  useUpdateUserMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: string };

export default function List() {
  const { data, isLoading } = useUsersQuery();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="User"
      description="Manage the list of all users in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}

        <GridPanel
          data={data ?? []}
          onEdit={user => setPopup({ mode: 'edit', id: user.id })}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'userName', header: 'User Name' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'email', header: 'Email' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: UserManagement.UserList) => (
                <span
                  className={
                    item.isActive
                      ? 'text-green-600 font-medium'
                      : 'text-red-600 font-medium'
                  }
                >
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
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

      {/* Create Popup */}
      <FormPopup
        visible={popup.mode === 'create'}
        onHide={closePopup}
        title="Create User"
        subtitle="Fill in the details to add a new user."
      >
        <CreateUserContent onClose={closePopup} />
      </FormPopup>

      {/* Edit Popup */}
      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit User"
        subtitle="Update the details of the user."
      >
        {popup.mode === 'edit' && (
          <EditUserContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

/* ── Inline Create Content ── */
function CreateUserContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateUserMutation();

  async function handleSubmit(data: UserManagement.UserForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('User created successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to create user');
    }
  }

  return <UserForm onSubmit={handleSubmit} isSaving={isPending} />;
}

/* ── Inline Edit Content ── */
function EditUserContent({ id, onClose }: { id: string; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateUserMutation(id);
  const { data, isLoading } = useUserQuery(id);

  const DEFAULT: UserManagement.UserForm = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    isActive: true,
  };

  async function handleSubmit(formData: UserManagement.UserForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('User updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update user');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <UserForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
