import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useReligionActiveStatusMutation, useReligionsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useReligionsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useReligionActiveStatusMutation();

  const handleToggleStatus = async (item: Master.ReligionItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Religion"
      description="Manage the list of all religions in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={religion => navigate(masterUrls.religion.edit(religion.id))}
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
              cell: (item: Master.ReligionItem) => (
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
              onClick={() => navigate(masterUrls.religion.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
