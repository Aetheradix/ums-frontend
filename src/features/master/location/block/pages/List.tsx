import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useBlockActiveStatusMutation, useBlocksQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useBlocksQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useBlockActiveStatusMutation();

  const handleToggleStatus = async (item: Master.BlockItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Block"
      description="Manage the list of all blocks in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
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
              onClick={() => navigate(masterUrls.block.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
