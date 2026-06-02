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
import RolePermissionForm from '../components/RolePermissionForm';
import {
  useCreateRolePermissionMutation,
  useRolePermissionsQuery,
  useUpdateRolePermissionMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; item: UserManagement.RolePermissionList };

export default function List() {
  const { data, isLoading } = useRolePermissionsQuery();
  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Role Permissions Configuration"
      description="Manage the role permissions mapping configuration in the system."
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
            { field: 'roleName', header: 'Role' },
            { field: 'domain', header: 'Domain' },
            { field: 'feature', header: 'Features' },
            { field: 'action', header: 'Actions' },
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
        title="Create Role Permission"
        subtitle="Fill in the details to map a new role permission."
      >
        <CreateRolePermissionContent onClose={closePopup} />
      </FormPopup>

      {/* Edit Popup */}
      <FormPopup
        visible={popup.mode === 'edit'}
        onHide={closePopup}
        title="Edit Role Permission"
        subtitle="Update the action for this role permission."
      >
        {popup.mode === 'edit' && (
          <EditRolePermissionContent item={popup.item} onClose={closePopup} />
        )}
      </FormPopup>
    </FormPage>
  );
}

/* ── Inline Create Content ── */
function CreateRolePermissionContent({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending } = useCreateRolePermissionMutation();

  async function handleSubmit(data: UserManagement.RolePermissionCreate) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Role permission granted successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to grant role permission');
    }
  }

  return <RolePermissionForm onSubmit={handleSubmit} isSaving={isPending} />;
}

/* ── Inline Edit Content ── */
function EditRolePermissionContent({
  item,
  onClose,
}: {
  item: UserManagement.RolePermissionList;
  onClose: () => void;
}) {
  const { mutateAsync, isPending } = useUpdateRolePermissionMutation();

  async function handleSubmit(formData: UserManagement.RolePermissionCreate) {
    try {
      const result = await mutateAsync({
        roleName: item.roleName,
        domain: item.domain,
        feature: item.feature,
        oldAction: item.action,
        newAction: formData.action,
      });
      if (result) {
        ToastService.success('Role permission updated successfully.');
        onClose();
      }
    } catch {
      ToastService.error('Failed to update role permission');
    }
  }

  return (
    <RolePermissionForm
      fetchData={() => Promise.resolve(item)}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
    />
  );
}
