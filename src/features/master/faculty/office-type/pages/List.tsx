import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useOfficeTypeActiveStatusMutation,
  useOfficeTypesQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useOfficeTypesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useOfficeTypeActiveStatusMutation();

  const handleToggleStatus = async (item: Master.OfficeTypeItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Office Type"
      description="Manage the list of all office types in the system."
    >
      <FormCard>
        <GridPanel
          title="Office Types"
          data={data}
          loading={isLoading}
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
              cell: (item: Master.OfficeTypeItem) => (
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
              onClick={() => navigate(masterUrls.officeType.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
