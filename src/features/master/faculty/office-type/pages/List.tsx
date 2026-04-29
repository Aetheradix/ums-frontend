import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import {
  useOfficeTypeActiveStatusMutation,
  useOfficeTypesQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useOfficeTypesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useOfficeTypeActiveStatusMutation();

  const handleToggleStatus = async (item: OfficeTypeMaster.OfficeTypeItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <Page header="Office Type">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Office Types`"
          data={data}
          onEdit={officetype =>
            navigate(masterUrls.officeType.edit(officetype.id))
          }
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
              cell: (item: OfficeTypeMaster.OfficeTypeItem) => (
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
              to={masterUrls.officeType.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
