import { Outlet, useNavigate } from 'react-router';
import { LinkButton } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Card, Page } from 'shared/components/panels';
import { GridPanel } from 'shared/new-components';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import {
  useSubjectCategoriesQuery,
  useSubjectCategoryActiveStatusMutation,
} from '../queries';

export default function List() {
  const { data, isLoading } = useSubjectCategoriesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useSubjectCategoryActiveStatusMutation();

  const handleToggleStatus = async (item: CourseMaster.SubjectCategoryItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <Page header="Subject Category">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Subject Categories"
          data={data}
          onEdit={category =>
            navigate(masterUrls.subjectCategory.edit(category.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'categoryName', header: 'Name' },
            { field: 'categoryNameHindi', header: 'Name (Hindi)' },
            { field: 'code', header: 'Code' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: CourseMaster.SubjectCategoryItem) => (
                <StatusButton
                  value={item.isActive}
                  onClick={() => handleToggleStatus(item)}
                />
              ),
            },
          ]}
          toolbar={
            <LinkButton
              label="Create"
              icon="plus"
              to={masterUrls.subjectCategory.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
