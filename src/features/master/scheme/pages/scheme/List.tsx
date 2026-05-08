import { useSchemeTypesQuery, useSchemesCategoriesQuery } from 'features/master/scheme/queries';
import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { schemeUrls } from '../../urls';
import {
  useSchemesQuery,
  useSchemeActiveStatusMutation,
} from '../../scheme-queries';

export default function List() {
  const { data, isLoading } = useSchemesQuery();
  const { data: schemeTypes = [] } = useSchemeTypesQuery();
  const { data: schemeCategories = [] } = useSchemesCategoriesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useSchemeActiveStatusMutation();

  const handleToggleStatus = async (item: Master.Scheme.SchemeItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const getSchemeTypeName = (schemeTypeId: number) => {
    return schemeTypes.find(st => st.id === schemeTypeId)?.name || '-';
  };

  const getSchemeCategoryName = (schemeCategoryId: number) => {
    return schemeCategories.find((sc: Master.Scheme.SchemeCategoryItem) => sc.id === schemeCategoryId)?.name || '-';
  };

  return (
    <FormPage
      title="Scheme"
      description="Manage the list of all schemes in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          onEdit={scheme =>
            navigate(schemeUrls.scheme.edit(scheme.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'code', header: 'Code' },
            {
              header: 'Scheme Type',
              cell: (item: Master.Scheme.SchemeItem) => (
                <span>{getSchemeTypeName(item.schemeTypeId)}</span>
              ),
            },
            {
              header: 'Scheme Category',
              cell: (item: Master.Scheme.SchemeItem) => (
                <span>{getSchemeCategoryName(item.schemeCategoryId)}</span>
              ),
            },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.Scheme.SchemeItem) => (
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
              onClick={() => navigate(schemeUrls.scheme.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
