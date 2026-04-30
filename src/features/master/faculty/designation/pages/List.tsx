import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import {
  useDesignationActiveStatusMutation,
  useDesignationsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useDesignationsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDesignationActiveStatusMutation();

  const handleToggleStatus = async (item: Master.DesignationItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <Page header="Designation">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Designations"
          data={data}
          onEdit={designation =>
            navigate(masterUrls.designation.edit(designation.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.DesignationItem) => (
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
              to={masterUrls.designation.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
