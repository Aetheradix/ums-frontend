import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import { useDeleteTehsilMutation, useTehsilsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useTehsilsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteTehsilMutation();

  const handleDelete = async (item: Master.TehsilItem) => {
    await mutateAsync(item.id);
  };

  return (
    <Page header="Tehsil">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Tehsils"
          data={data}
          onEdit={tehsil => navigate(masterUrls.tehsil.edit(tehsil.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'districtId', header: 'District' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.TehsilItem) => (
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
              to={masterUrls.tehsil.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
