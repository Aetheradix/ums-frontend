import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import { useRolesQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useRolesQuery();
  const navigate = useNavigate();
  // const { mutateAsync } = useRoleMutation();

  // const handleToggleStatus = async (item: Master.UserManagement.RoleItem) => {
  //   await mutateAsync({
  //     id: item.roleId,
  //   });
  // };

  return (
    <FormPage
      title="Role"
      description="Manage the list of all roles in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={role => navigate(masterUrls.role.edit(role.id))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
          ]}
          toolbar={
            <Button
              label="Create"
              icon="plus"
              variant="primary"
              onClick={() => navigate(masterUrls.role.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
