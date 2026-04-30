import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import { useDeleteDivisionMutation, useDivisionsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useDivisionsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteDivisionMutation();

  const handleDelete = async (item: Master.DivisionItem) => {
    await mutateAsync(item.id);
  };

  return (
    <Page header="Division">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Divisions"
          data={data}
          onEdit={division => navigate(masterUrls.division.edit(division.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'stateId', header: 'State' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.DivisionItem) => (
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
              to={masterUrls.division.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
