import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useDepartmentActiveStatusMutation,
  useDepartmentsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useDepartmentsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDepartmentActiveStatusMutation();

  const handleToggleStatus = async (item: Master.DepartmentItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Department"
      description="Manage the list of all departments in the system."
    >
      <FormCard>
        <GridPanel
          title="Departments"
          data={data}
          loading={isLoading}
          onEdit={department =>
            navigate(masterUrls.department.edit(department.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'officeTypeName', header: 'Office Type' },
            { field: 'hodName', header: 'Head of Department' },
            { field: 'contactNumber', header: 'Contact Number' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.DepartmentItem) => (
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
              onClick={() => navigate(masterUrls.department.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
