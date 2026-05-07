import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useDegreeLevelActiveStatusMutation,
  useDegreeLevelsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useDegreeLevelsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDegreeLevelActiveStatusMutation();

  const handleToggleStatus = async (item: Master.Other.DegreeLevelItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Degree Level"
      description="Manage the list of all degree levels in the system."
    >
      <FormCard>
        <GridPanel
          data={data as Master.Other.DegreeLevelItem[]}
          loading={isLoading}
          onEdit={degreeLevel =>
            navigate(masterUrls.degreeLevel.edit(degreeLevel.id))
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
              cell: (item: Master.Other.DegreeLevelItem) => (
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
              onClick={() => navigate(masterUrls.degreeLevel.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
