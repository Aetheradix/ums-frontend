import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useDesignationActiveStatusMutation,
  useDesignationsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useDesignationsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDesignationActiveStatusMutation();

  const handleToggleStatus = async (item: Master.DesignationItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Designation"
      description="Manage the list of all designations in the system."
    >
      <FormCard>
        <GridPanel
          data={data}
          loading={isLoading}
          onEdit={designation =>
            navigate(masterUrls.designation.edit(designation.id))
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
              cell: (item: Master.DesignationItem) => (
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
              onClick={() => navigate(masterUrls.designation.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
