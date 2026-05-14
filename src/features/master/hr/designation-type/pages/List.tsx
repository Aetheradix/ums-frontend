import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useDesignationTypeActiveStatusMutation,
  useDesignationTypesQuery,
} from '../queries';

export default function List() {
  const navigate = useNavigate();
  const { data, isLoading } = useDesignationTypesQuery();
  const { mutateAsync: toggleStatus } =
    useDesignationTypeActiveStatusMutation();

  const handleToggleStatus = async (item: Master.HR.DesignationTypeItem) => {
    await toggleStatus({ id: item.id, isActive: !item.isActive });
  };

  return (
    <FormPage
      title="Designation Type Master"
      description="Manage the list of all designation types in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={item => navigate(masterUrls.designationType.edit(item.id))}
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
              cell: (item: Master.HR.DesignationTypeItem) => (
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
              onClick={() => navigate(masterUrls.designationType.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
