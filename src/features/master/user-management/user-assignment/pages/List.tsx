import { useCallback, useMemo, useState } from 'react';
import { ConfirmService, ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  GridPanel,
  InlineCreatePanel,
} from 'shared/new-components';
import RoleSidePanel from '../../components/RoleSidePanel';
import '../../components/RoleSplitLayout.css';
import UserAssignmentForm from '../components/UserAssignmentForm';
import {
  useCreateUserAssignmentMutation,
  useDeleteUserAssignmentMutation,
  useUserAssignmentsQuery,
} from '../queries';
import './UserAssignmentList.css';

type PopupState = { mode: 'closed' } | { mode: 'create' };

export default function List() {
  const { data, isLoading } = useUserAssignmentsQuery();
  const { mutateAsync: deleteAssignment } = useDeleteUserAssignmentMutation();

  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });
  const [selectedRole, setSelectedRole] =
    useState<UserManagement.UserRoleList | null>(null);

  const filteredAssignments = useMemo(() => {
    if (!selectedRole) return [];

    return (data ?? []).filter(item => item.roleName === selectedRole.name);
  }, [data, selectedRole]);

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  const handleDeleteAssignment = async (
    item: UserManagement.UserAssignmentList
  ) => {
    const isConfirmed = await ConfirmService.confirm(
      `Are you sure you want to remove "${item.userName}" from role "${item.roleName}"?`
    );
    if (!isConfirmed) return;
    try {
      const ok = await deleteAssignment(item);
      if (ok) ToastService.success('User assignment deleted successfully.');
      else ToastService.error('Failed to delete user assignment.');
    } catch {
      ToastService.error('Failed to delete user assignment.');
    }
  };

  return (
    <FormPage title="User Assignments">
      <FormCard>
        <div className="role-split-layout">
          <RoleSidePanel
            selectedRoleId={selectedRole?.id}
            onRoleSelect={setSelectedRole}
          />

          <div className="role-main-panel">
            {isLoading ? <Loader /> : undefined}

            <InlineCreatePanel
              visible={popup.mode === 'create'}
              title="Create User Assignment"
              onClose={closePopup}
            >
              <CreateUserAssignmentContent
                onClose={closePopup}
                selectedRoleName={selectedRole?.name}
              />
            </InlineCreatePanel>

            {!selectedRole ? (
              <div className="role-empty-state">
                <i className="pi pi-users role-empty-icon" />
                <h4>Select a role</h4>
                <p>
                  Select a role from the left panel to view and manage user
                  assignments.
                </p>
              </div>
            ) : (
              <GridPanel
                data={filteredAssignments}
                emptyMessage={`No Records found.`}
                columns={[
                  { field: 'userName', header: 'User' },
                  { field: 'roleName', header: 'Role' },
                  { field: 'domain', header: 'Domain' },
                  {
                    header: 'Action',
                    sortable: false,
                    width: '120px',
                    cell: (item: UserManagement.UserAssignmentList) => (
                      <div className="grid-row-actions-center">
                        <button
                          type="button"
                          className="grid-action-icon-btn grid-action-delete-btn"
                          aria-label="Delete user assignment"
                          title="Delete"
                          onClick={() => handleDeleteAssignment(item)}
                        >
                          <i className="pi pi-trash" />
                        </button>
                      </div>
                    ),
                  },
                ]}
                toolbar={
                  <Button
                    label="Create"
                    icon="plus"
                    variant="primary"
                    disabled={!selectedRole}
                    onClick={() => setPopup({ mode: 'create' })}
                  />
                }
                searchBox
              />
            )}
          </div>
        </div>
      </FormCard>
    </FormPage>
  );
}

/* ── Inline Create Content ── */
function CreateUserAssignmentContent({
  onClose,
  selectedRoleName,
}: {
  onClose: () => void;
  selectedRoleName?: string;
}) {
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

  return (
    <UserAssignmentForm
      onSubmit={handleSubmit}
      isSaving={isPending}
      fetchData={
        selectedRoleName
          ? () => Promise.resolve({ roleName: selectedRoleName } as any)
          : undefined
      }
    />
  );
}
