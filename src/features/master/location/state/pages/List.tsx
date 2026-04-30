import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import { useDeleteStateMutation, useStatesQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useStatesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteStateMutation();

  const handleDelete = async (item: Master.StateItem) => {
    await mutateAsync(item.id);
  };

  return (
    <Page header="State">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="States"
          data={data}
          onEdit={state => navigate(masterUrls.state.edit(state.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.StateItem) => (
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
              to={masterUrls.state.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
