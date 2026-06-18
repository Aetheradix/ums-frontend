import { useCallback, useState } from 'react';
import { Button, StatusButton } from 'shared/components/buttons';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import CreateDepartmentGroupType from '../components/CreateDepartmentGroupType';
import EditDepartmentGroupType from '../components/EditDepartmentGroupType';
import {
  useDepartmentGroupTypesQuery,
  useDepartmentGroupTypeStatusMutation,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useDepartmentGroupTypesQuery();

  const { mutateAsync: toggleStatus } = useDepartmentGroupTypeStatusMutation();

  const [popup, setPopup] = useState<PopupState>({
    mode: 'closed',
  });

  const handleToggleStatus = async (
    item: Master.Employee.DepartmentGroupTypeItem
  ) => {
    await toggleStatus({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Department Group Types"
      description="Manage the list of all department group types in the system."
    >
      <FormCard>
        <GridPanel
          data={data as Master.Employee.DepartmentGroupTypeItem[]}
          loading={isLoading}
          onEdit={departmentGroupType =>
            setPopup({
              mode: 'edit',
              id: departmentGroupType.id,
            })
          }
          columns={[
            {
              cell: (_, departmentGroupType) => (
                <span>{departmentGroupType.rowIndex + 1}</span>
              ),
              width: '30px',
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
              cell: (item: Master.Employee.DepartmentGroupTypeItem) => (
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
          title="Create Department Group Type"
          subtitle="Fill in the details to add a new department group type."
        >
          <CreateDepartmentGroupType onClose={closePopup} />
        </FormPopup>
      ) : null}

      {popup.mode === 'edit' ? (
        <FormPopup
          visible
          onHide={closePopup}
          title="Edit Department Group Type"
          subtitle="Update the details of the department group type."
        >
          <EditDepartmentGroupType id={popup.id} onClose={closePopup} />
        </FormPopup>
      ) : null}
    </FormPage>
  );
}
