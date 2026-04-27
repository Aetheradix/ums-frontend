import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import {
  useDepartmentActiveStatusMutation,
  useDepartmentsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useDepartmentsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDepartmentActiveStatusMutation();

  const handleToggleStatus = async (item: DepartmentMaster.DepartmentItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <Page header="Department">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Departments"
          data={data}
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
              cell: (item: DepartmentMaster.DepartmentItem) => (
                <StatusButton
                  value={item.isActive}
                  onClick={() => handleToggleStatus(item)}
                />
              ),
            },
          ]}
          toolbar={
            <LinkButton
              label="Create"
              icon="plus"
              to={masterUrls.department.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
