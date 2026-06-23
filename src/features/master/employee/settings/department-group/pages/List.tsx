import { useCallback, useState } from 'react';
import { Button, StatusButton } from 'shared/components/buttons';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import CreateDepartmentGroup from '../components/CreateDepartmentGroup';
import EditDepartmentGroup from '../components/EditDepartmentGroup';
import {
  useDepartmentGroupActiveStatusMutation,
  useDepartmentGroupsQuery,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useDepartmentGroupsQuery();

  const { mutateAsync: toggleStatus } =
    useDepartmentGroupActiveStatusMutation();

  const [popup, setPopup] = useState<PopupState>({
    mode: 'closed',
  });

  const handleToggleStatus = async (
    item: Master.Employee.DepartmentGroupItem
  ) => {
    await toggleStatus({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Department Groups"
      description="Manage the list of all department groups in the system."
    >
      <FormCard>
        <GridPanel
          data={data as Master.Employee.DepartmentGroupItem[]}
          loading={isLoading}
          onEdit={group =>
            setPopup({
              mode: 'edit',
              id: group.id,
            })
          }
          columns={[
            {
              cell: (_, group) => <span>{group.rowIndex + 1}</span>,
              width: '30px',
            },
            {
              field: 'departmentGroupTypeName',
              header: 'Group Type',
            },
            {
              field: 'name',
              header: 'Name',
            },
            {
              field: 'code',
              header: 'Code',
            },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.Employee.DepartmentGroupItem) => (
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

      {popup.mode === 'create' ? (
        <FormPopup
          visible
          onHide={closePopup}
          title="Create Department Group"
          subtitle="Fill in the details to add a new department group."
        >
          <CreateDepartmentGroup onClose={closePopup} />
        </FormPopup>
      ) : null}

      {popup.mode === 'edit' ? (
        <FormPopup
          visible
          onHide={closePopup}
          title="Edit Department Group"
          subtitle="Update the details of the department group."
        >
          {popup.mode === 'edit' && (
            <EditDepartmentGroup id={popup.id} onClose={closePopup} />
          )}
        </FormPopup>
      ) : null}
    </FormPage>
  );
}
