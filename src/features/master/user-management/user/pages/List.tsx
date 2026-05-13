import { useState } from 'react';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  GridPanel,
  FormPopup,
} from 'shared/new-components';
import {
  useUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../queries';
import UserForm from '../components/UserForm';

export default function List() {
  const { data, isLoading } = useUsersQuery();
  const [selectedUser, setSelectedUser] =
    useState<Master.UserManagement.UserItem | null>(null);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation(selectedUser?.id || '');
  const deleteUserMutation = useDeleteUserMutation();

  const handleCreate = () => {
    setSelectedUser(null);
    setPopupVisible(true);
  };

  const handleEdit = (user: Master.UserManagement.UserItem) => {
    setSelectedUser(user);
    setPopupVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUserMutation.mutateAsync(id);
    }
  };

  const handleSave = async (form: Master.UserManagement.UserForm) => {
    if (selectedUser) {
      await updateUserMutation.mutateAsync(form);
    } else {
      await createUserMutation.mutateAsync(form);
    }
    setPopupVisible(false);
  };

  return (
    <FormPage
      title="Users"
      description="Manage system users and their profiles."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          columns={[
            {
              header: '#',
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '50px',
            },
            {
              field: 'userName',
              header: 'Username',
            },
            {
              field: 'email',
              header: 'Email',
            },
            {
              field: 'phoneNumber',
              header: 'Phone Number',
            },
            {
              header: 'Actions',
              width: '150px',
              cell: (item: Master.UserManagement.UserItem) => (
                <div className="flex gap-2">
                  <Button
                    icon="pencil"
                    variant="text"
                    className="p-button-rounded"
                    onClick={() => handleEdit(item)}
                  />
                  <Button
                    icon="trash"
                    variant="text"
                    className="p-button-rounded p-button-danger"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              ),
            },
          ]}
          toolbar={
            <Button
              label="Add User"
              icon="plus"
              variant="primary"
              onClick={handleCreate}
            />
          }
          searchBox
        />
      </FormCard>

      <FormPopup
        visible={isPopupVisible}
        onHide={() => setPopupVisible(false)}
        title={selectedUser ? 'Edit User' : 'Add User'}
      >
        <UserForm
          initialValues={selectedUser || undefined}
          onSave={handleSave}
          onCancel={() => setPopupVisible(false)}
          isLoading={
            createUserMutation.isPending || updateUserMutation.isPending
          }
        />
      </FormPopup>
    </FormPage>
  );
}
