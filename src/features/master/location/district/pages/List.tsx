import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import { useDeleteDistrictMutation, useDistrictsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useDistrictsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteDistrictMutation();

  const handleDelete = async (item: Master.DistrictItem) => {
    await mutateAsync(item.id);
  };

  return (
    <Page header="District">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Districts"
          data={data}
          onEdit={district => navigate(masterUrls.district.edit(district.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'divisionId', header: 'Division' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.DistrictItem) => (
                <StatusButton
                  value={item.isActive}
                  onClick={() => handleDelete(item)}
                />
              ),
            },
          ]}
          toolbar={
            <LinkButton
              label="Create"
              icon="plus"
              to={masterUrls.district.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
