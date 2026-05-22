import Checkbox from 'shared/components/forms/CheckBox';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';

import { useUserQuery } from 'features/master/other/user/queries';

export default function List() {
  const { data: userData, isLoading } = useUserQuery();

  return (
    <FormPage
      title="Users List"
      //description="Manage the list of all users in the system."
    >
      <FormCard>
        {isLoading ? (
          <Loader />
        ) : (
          <GridPanel
            data={userData ?? []}
            columns={[
              {
                header: 'S.No',
                cell: (_, option) => <span>{option.rowIndex + 1}</span>,
                width: 50,
              },
              {
                header: 'Select',
                width: 100,
                cell: () => (
                  <div className="flex justify-center items-center">
                    <Checkbox></Checkbox>
                  </div>
                ),
              },

              { field: 'text', header: 'User', sortable: true },
            ]}
            searchBox
          />
        )}
      </FormCard>
    </FormPage>
  );
}
