import { masterUrls } from 'features/master/urls';
import { useNavigate } from 'react-router';
import { Button } from '../../../../../shared/components/buttons';
import { Loader } from '../../../../../shared/components/progress';
import {
  FormCard,
  FormPage,
  GridPanel,
} from '../../../../../shared/new-components';
import { useUsersQuery } from '../queries';

export default function List() {
  const { data, isLoading } = useUsersQuery();
  const navigate = useNavigate();

  return (
    <FormPage
      title="User"
      description="Manage the list of all users in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={user => navigate(masterUrls.user.edit(user.userId))}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'UserName', header: 'Name' },
          ]}
          toolbar={
            <Button
              label="Create"
              icon="plus"
              variant="primary"
              onClick={() => navigate(masterUrls.user.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
