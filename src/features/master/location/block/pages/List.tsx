import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import { useBlocksQuery, useDeleteBlockMutation } from '../queries';

export default function List() {
  const { data, isLoading } = useBlocksQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteBlockMutation();

  const handleDelete = async (item: Master.BlockItem) => {
    await mutateAsync(item.id);
  };

  return (
    <Page header="Block">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Blocks"
          data={data}
          onEdit={block => navigate(masterUrls.block.edit(block.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'districtId', header: 'District' },
            { field: 'tehsilId', header: 'Tehsil' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.BlockItem) => (
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
              to={masterUrls.block.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
