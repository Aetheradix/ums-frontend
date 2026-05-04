import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useTehsilActiveStatusMutation, useTehsilsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useTehsilsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useTehsilActiveStatusMutation();

  const handleToggleStatus = async (item: Master.TehsilItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Tehsil"
      description="Manage the list of all tehsils in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={tehsil => navigate(masterUrls.tehsil.edit(tehsil.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'districtName', header: 'District' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.TehsilItem) => (
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
              onClick={() => navigate(masterUrls.tehsil.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
