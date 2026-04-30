import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useDistrictActiveStatusMutation, useDistrictsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useDistrictsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDistrictActiveStatusMutation();

  const handleToggleStatus = async (item: Master.DistrictItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="District"
      description="Manage the list of all districts in the system."
    >
      <FormCard>
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
              onClick={() => navigate(masterUrls.district.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
