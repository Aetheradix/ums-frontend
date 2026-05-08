import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import {
  useSchemeTypeActiveStatusMutation,
  useSchemeTypesQuery,
} from '../../queries';
import { schemeUrls } from '../../urls';

export default function List() {
  const { data, isLoading } = useSchemeTypesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useSchemeTypeActiveStatusMutation();

  const handleToggleStatus = async (item: Master.Scheme.SchemeTypeItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Scheme Type"
      description="Manage the list of all scheme types in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={schemeType =>
            navigate(schemeUrls.schemeType.edit(schemeType.id))
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
              cell: (item: Master.Scheme.SchemeTypeItem) => (
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
              onClick={() => navigate(schemeUrls.schemeType.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
