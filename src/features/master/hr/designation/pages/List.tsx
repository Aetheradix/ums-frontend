import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useDesignationActiveStatusMutation,
  useDesignationsQuery,
} from '../queries';

export default function List() {
  const navigate = useNavigate();
  const { data, isLoading } = useDesignationsQuery();
  const { mutateAsync: toggleStatus } = useDesignationActiveStatusMutation();

  const handleToggleStatus = async (item: Master.HR.DesignationItem) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  return (
    <FormPage
      title="Designation Master"
      description="Manage the list of all designations in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={item => navigate(masterUrls.designation.edit(item.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'sequenceNumber', header: 'Sequence' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.HR.DesignationItem) => (
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
