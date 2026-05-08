import { useSchemeTypesQuery } from 'features/master/scheme/queries';
import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { schemeUrls } from '../../urls';
import {
  useSchemesCategoriesQuery,
  useSchemeCategoryActiveStatusMutation,
} from '../../queries';

export default function List() {
  const { data, isLoading } = useSchemesCategoriesQuery();
  const { data: schemeTypes = [] } = useSchemeTypesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useSchemeCategoryActiveStatusMutation();

  const handleToggleStatus = async (
    item: Master.Scheme.SchemeCategoryItem
  ) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const getSchemTypeName = (schemeTypeId: number) => {
    return schemeTypes.find(st => st.id === schemeTypeId)?.name || '-';
  };

  return (
    <FormPage
      title="Scheme Category"
      description="Manage the list of all scheme categories in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={schemeCategory =>
            navigate(schemeUrls.schemeCategory.edit(schemeCategory.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            {
              header: 'Scheme Type',
              cell: (item: Master.Scheme.SchemeCategoryItem) => (
                <span>{getSchemTypeName(item.schemeTypeId)}</span>
              ),
            },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.Scheme.SchemeCategoryItem) => (
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
              onClick={() => navigate(schemeUrls.schemeCategory.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
