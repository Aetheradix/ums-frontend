import type { OverlayPanel } from 'primereact/overlaypanel';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ConfirmService, ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import {
  ActionOverlay,
  FormCard,
  FormPage,
  GridPanel,
  InlineCreatePanel,
} from 'shared/new-components';
import RoleSidePanel from '../../components/RoleSidePanel';
import '../../components/RoleSplitLayout.css';
import RolePermissionForm from '../components/RolePermissionForm';
import {
  useCreateRolePermissionMutation,
  useDeleteRolePermissionMutation,
  useRolePermissionsQuery,
  useUpdateRolePermissionMutation,
} from '../queries';
import './RolePermissionsList.css';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; item: UserManagement.RolePermissionList };

type FeaturePermissionRow = {
  roleName: string;
  domain: string;
  feature: string;
  read: boolean;
  write: boolean;
  items: UserManagement.RolePermissionList[];
};

export default function List() {
  const { data, isLoading } = useRolePermissionsQuery();
  const { mutateAsync: deletePermissions } = useDeleteRolePermissionMutation();

  const editOverlayRef = useRef<OverlayPanel>(null);
  const editButtonRef = useRef<HTMLButtonElement | null>(null);

  const [popup, setPopup] = useState<PopupState>({ mode: 'closed' });
  const [clearSearch, setClearSearch] = useState<number>();

  const [selectedRole, setSelectedRole] =
    useState<UserManagement.UserRoleList | null>(null);

  const filteredPermissions = useMemo(() => {
    if (!selectedRole) return [];

    return (data ?? []).filter(item => item.roleName === selectedRole.name);
  }, [data, selectedRole]);

  const featurePermissionRows = useMemo<FeaturePermissionRow[]>(() => {
    const featureMap = new Map<string, FeaturePermissionRow>();

    filteredPermissions.forEach(item => {
      const key = `${item.domain}-${item.feature}`;

      if (!featureMap.has(key)) {
        featureMap.set(key, {
          roleName: item.roleName,
          domain: item.domain,
          feature: item.feature,
          read: false,
          write: false,
          items: [],
        });
      }

      const row = featureMap.get(key);
      if (!row) return;

      row.items.push(item);

      const action = item.action?.toLowerCase();

      if (action === 'read') {
        row.read = true;
      }

      if (action === 'write') {
        row.read = true;
        row.write = true;
      }
    });

    return Array.from(featureMap.values());
  }, [filteredPermissions]);

  const closePopup = useCallback((isSuccess?: boolean) => {
    setPopup({ mode: 'closed' });
    if (isSuccess === true) {
      setClearSearch(Date.now());
    }
  }, []);

  const closeEditOverlay = useCallback(() => {
    editOverlayRef.current?.hide();
    setPopup({ mode: 'closed' });
  }, []);

  const handleEditPermissionClick = (
    item: FeaturePermissionRow,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const editItem = item.items[0];

    if (!editItem) return;

    const target = event.currentTarget;
    editButtonRef.current = target;

    setPopup({ mode: 'edit', item: editItem });

    setTimeout(() => {
      editOverlayRef.current?.toggle(event, target);
    }, 0);
  };

  const handleDeletePermission = async (item: FeaturePermissionRow) => {
    const isConfirmed = await ConfirmService.confirm(
      `Are you sure you want to delete permissions for "${item.feature}"?`
    );
    if (!isConfirmed) return;
    try {
      await deletePermissions(item.items);
      ToastService.success('Permission deleted successfully.');
    } catch {
      ToastService.error('Failed to delete permission.');
    }
  };

  return (
    <FormPage
      title="Role Permissions Configuration"
      description="Manage the role permissions mapping configuration in the system."
    >
      <FormCard>
        <div className="role-split-layout">
          <RoleSidePanel
            selectedRoleId={selectedRole?.id}
            onRoleSelect={setSelectedRole}
          />

          <div className="role-main-panel role-permission-main-panel">
            {isLoading ? <Loader /> : undefined}

            <InlineCreatePanel
              visible={popup.mode === 'create'}
              title="Create Role Permission"
              onClose={() => closePopup()}
            >
              <CreateRolePermissionContent
                onClose={closePopup}
                selectedRoleName={selectedRole?.name}
              />
            </InlineCreatePanel>

            {!selectedRole ? (
              <div className="role-empty-state">
                <i className="pi pi-shield role-empty-icon" />
                <h4>Select a role</h4>
                <p>
                  Select a role from the left panel to view and manage its
                  feature permissions.
                </p>
              </div>
            ) : (
              <GridPanel
                data={featurePermissionRows}
                emptyMessage={`No Records found`}
                columns={[
                  {
                    field: 'domain',
                    header: 'Domain',
                  },
                  {
                    field: 'feature',
                    header: 'Feature Name',
                    cell: (item: FeaturePermissionRow) => (
                      <span className="role-permission-feature-name text-left block">
                        {item.feature}
                      </span>
                    ),
                  },
                  {
                    field: 'read',
                    header: 'Read',
                    sortable: false,
                    width: '110px',
                    cell: (item: FeaturePermissionRow) => (
                      <input
                        type="checkbox"
                        checked={item.read}
                        readOnly
                        disabled
                        className="role-permission-check"
                      />
                    ),
                  },
                  {
                    field: 'write',
                    header: 'Write',
                    sortable: false,
                    width: '110px',
                    cell: (item: FeaturePermissionRow) => (
                      <input
                        type="checkbox"
                        checked={item.write}
                        readOnly
                        disabled
                        className="role-permission-check"
                      />
                    ),
                  },
                  {
                    header: 'Action',
                    sortable: false,
                    width: '120px',
                    cell: (item: FeaturePermissionRow) => (
                      <div className="grid-row-actions-center">
                        <button
                          type="button"
                          className="grid-action-icon-btn grid-action-edit-btn"
                          aria-label="Edit permission"
                          title="Edit"
                          onClick={event =>
                            handleEditPermissionClick(item, event)
                          }
                        >
                          <i className="pi pi-pencil" />
                        </button>

                        <button
                          type="button"
                          className="grid-action-icon-btn grid-action-delete-btn"
                          aria-label="Delete permission"
                          title="Delete"
                          onClick={() => handleDeletePermission(item)}
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
                clearSearch={clearSearch}
                searchBox
              />
            )}
          </div>
        </div>
      </FormCard>

      <ActionOverlay
        ref={editOverlayRef}
        className="role-permission-edit-overlay-panel action-overlay-md"
        dismissable
        closeOnEscape
        showCloseIcon={false}
      >
        <div className="action-overlay-shell">
          <div className="action-overlay-header">
            <div>
              <h3 className="action-overlay-title">Edit Role Permission</h3>
            </div>

            <button
              type="button"
              className="action-overlay-close"
              onClick={closeEditOverlay}
              aria-label="Close edit role permission overlay"
            >
              <i className="pi pi-times" />
            </button>
          </div>

          <div className="action-overlay-body">
            {popup.mode === 'edit' && (
              <EditRolePermissionContent
                item={popup.item}
                onClose={closeEditOverlay}
              />
            )}
          </div>
        </div>
      </ActionOverlay>
    </FormPage>
  );
}

/* ── Inline Create Content ── */
function CreateRolePermissionContent({
  onClose,
  selectedRoleName,
}: {
  onClose: (isSuccess?: boolean) => void;
  selectedRoleName?: string;
}) {
  const { mutateAsync, isPending } = useCreateRolePermissionMutation();

  async function handleSubmit(data: UserManagement.RolePermissionCreate) {
    try {
      const result = await mutateAsync(data);
      if (result) {
        ToastService.success('Role permission granted successfully.');
        onClose(true);
      }
    } catch {
      ToastService.error('Failed to grant role permission');
    }
  }

  return (
    <RolePermissionForm
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
      fetchData={() => Promise.resolve({ ...item, feature: [item.feature] })}
      isSaving={isPending}
      isEditMode
      onSubmit={handleSubmit}
      columns={1}
    />
  );
}
