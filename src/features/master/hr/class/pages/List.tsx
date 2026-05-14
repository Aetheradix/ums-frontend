import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useClassActiveStatusMutation, useClassesQuery } from '../queries';

export default function List() {
  const navigate = useNavigate();
  const { data, isLoading } = useClassesQuery();
  const { mutateAsync: toggleStatus } = useClassActiveStatusMutation();

  const handleToggleStatus = async (item: Master.HR.ClassItem) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  return (
    <FormPage
      title="Class Master"
      description="Manage the list of all classes in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={item => navigate(masterUrls.class.edit(item.id))}
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
              cell: (item: Master.HR.ClassItem) => (
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
              onClick={() => navigate(masterUrls.class.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
