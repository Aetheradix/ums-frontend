import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useDivisionActiveStatusMutation, useDivisionsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useDivisionsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDivisionActiveStatusMutation();

  const handleToggleStatus = async (item: Master.DivisionItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Division"
      description="Manage the list of all divisions in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
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
              onClick={() => navigate(masterUrls.division.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
