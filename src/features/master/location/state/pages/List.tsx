import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useStateActiveStatusMutation, useStatesQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useStatesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useStateActiveStatusMutation();

  const handleToggleStatus = async (item: Master.StateItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="State"
      description="Manage the list of all states in the system."
    >
      <FormCard>
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
              onClick={() => navigate(masterUrls.state.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
