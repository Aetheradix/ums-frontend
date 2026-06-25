import { useCallback, useState } from 'react';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
  StatusBadge,
} from 'shared/new-components';
import { ConfirmService, ToastService } from 'services';
import RoleForm from '../components/RoleForm';
import {
  useCreateUserRoleMutation,
  useUserRoleQuery,
  useUserRolesQuery,
  useUpdateUserRoleMutation,
  useDeleteUserRoleMutation,
} from '../queries';
import { useUserAssignmentsQuery } from '../../user-assignment/queries';
import './RoleList.css';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: string };

export default function List() {
  const { data, isLoading } = useUserRolesQuery();
  const { data: assignments } = useUserAssignmentsQuery();
  const { mutateAsync: deleteRole } = useDeleteUserRoleMutation();
  const sortedData = data ? [...data].reverse() : [];
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });
  const [clearSearch, setClearSearch] = useState<number>();

  const closePopup = useCallback((isSuccess?: boolean) => {
    setPopup({ mode: 'closed' });
    if (isSuccess === true) {
      setClearSearch(Date.now());
    }
  }, []);

  const handleDeleteRole = async (role: UserManagement.UserRoleList) => {
    const isAssigned = assignments?.some(a => a.roleName === role.name);
    if (isAssigned) {
      ToastService.warn(
        'The selected role is currently assigned to one or more users and cannot be deleted.'
      );
      return;
    }

    const isConfirmed = await ConfirmService.confirm(
      `Are you sure you want to delete role "${role.name}"?`
    );
    if (!isConfirmed) return;

    try {
      await deleteRole(role.id);
      ToastService.success('Role deleted successfully.');
      setClearSearch(Date.now());
    } catch {
      ToastService.error('Failed to delete role');
    }
  };

  return (
    <FormPage title="User Roles" description="Manage user roles in the system.">
      <FormCard>
        {isLoading ? <Loader /> : undefined}

        <GridPanel
          data={sortedData}
          clearSearch={clearSearch}
          onEdit={role => setPopup({ mode: 'edit', id: role.id })}
          onRemove={handleDeleteRole}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Role Name' },
            { field: 'description', header: 'Description' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: UserManagement.UserRoleList) => (
                <StatusBadge
                  label={item.isActive ? 'Active' : 'Inactive'}
                  variant={item.isActive ? 'approved' : 'rejected'}
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

      {/* Create Popup */}
      <FormPopup
        visible={popup.mode === 'create'}
        onHide={() => closePopup()}
        title="Create Role"
        subtitle="Fill in the details to add a new role."
      >
        <CreateRoleContent onClose={closePopup} />
      </FormPopup>

      {/* Edit Popup */}
      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Role"
        subtitle="Update the details of the role."
      >
        {popup.mode === 'edit' && (
          <EditRoleContent id={popup.id} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

/* ── Inline Create Content ── */
function CreateRoleContent({
  onClose,
}: {
  onClose: (isSuccess?: boolean) => void;
}) {
  const { mutateAsync, isPending } = useCreateUserRoleMutation();

  async function handleSubmit(data: UserManagement.UserRoleForm) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Role created successfully.');
        onClose(true);
      }
    } catch {
      ToastService.error('Failed to create role');
    }
  }

  return <RoleForm onSubmit={handleSubmit} isSaving={isPending} />;
}

/* ── Inline Edit Content ── */
function EditRoleContent({ id, onClose }: { id: string; onClose: () => void }) {
  const { mutateAsync, isPending } = useUpdateUserRoleMutation(id);
  const { data, isLoading } = useUserRoleQuery(id);

  const DEFAULT: UserManagement.UserRoleForm = {
    name: '',
    description: '',
    isActive: true,
  };

  async function handleSubmit(formData: UserManagement.UserRoleForm) {
    try {
      const result = await mutateAsync(formData);
      if (result) {
        ToastService.success('Role updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update role');
    }
  }

  if (isLoading) return <Loader />;

  return (
    <RoleForm
      fetchData={data ?? DEFAULT}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
