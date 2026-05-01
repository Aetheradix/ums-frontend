import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useCasteActiveStatusMutation, useCastesQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useCastesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useCasteActiveStatusMutation();

  const handleToggleStatus = async (item: Master.CasteItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Caste"
      description="Manage the list of all castes in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={caste => navigate(masterUrls.caste.edit(caste.id))}
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
              cell: (item: Master.CasteItem) => (
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
              onClick={() => navigate(masterUrls.caste.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
