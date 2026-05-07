import { masterUrls } from 'features/master/urls';
import { useNavigate } from 'react-router';
import { Button } from '../../../../../shared/components/buttons';
import { Loader } from '../../../../../shared/components/progress';
import {
  FormCard,
  FormPage,
  GridPanel,
} from '../../../../../shared/new-components';
import { useUserRoleMappingsQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useUserRoleMappingsQuery();
  const navigate = useNavigate();

  return (
    <FormPage
      title="User Role Mappings"
      description="Manage the list of all user role mappings in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={userrolemapping =>
            navigate(masterUrls.userRoleMapping.edit(userrolemapping.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'UserId', header: 'Name' },
            { field: 'RoleName', header: 'Role' },
          ]}
          toolbar={
            <Button
              label="Create"
              icon="plus"
              variant="primary"
              onClick={() => navigate(masterUrls.userRoleMapping.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
