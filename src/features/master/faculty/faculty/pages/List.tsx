import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useFacultyActiveStatusMutation, useFacultiesQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useFacultiesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useFacultyActiveStatusMutation();

  const handleToggleStatus = async (item: Master.FacultyItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Faculty"
      description="Manage the list of all faculties in the system."
    >
      <FormCard>
        <GridPanel
          data={data}
          loading={isLoading}
          onEdit={faculty => navigate(masterUrls.faculty.edit(faculty.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            { field: 'mobile', header: 'Mobile' },
            { field: 'email', header: 'Email' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.FacultyItem) => (
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
              onClick={() => navigate(masterUrls.faculty.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
