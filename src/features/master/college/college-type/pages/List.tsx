import { Outlet, useNavigate } from 'react-router';
import { Button, LinkButton } from 'shared/components/buttons';
import { Card, GridPanel, Page } from 'shared/components/panels';
import { Loader } from 'shared/components/progress';
import { masterUrls } from '../../../urls';
import {
  useCollegeTypesQuery,
  useDeleteCollegeTypeMutation,
} from '../queries';
import { ToastService } from 'services';

export default function List() {
  const { data, isLoading } = useCollegeTypesQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteCollegeTypeMutation();

  const handleDelete = async (item: CollegeMaster.CollegeTypeItem) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const res = await mutateAsync(item.id);
        if (res) ToastService.success('Deleted successfully');
      } catch {
        ToastService.error('Failed to delete');
      }
    }
  };

  return (
    <Page header="College Type">
      <Card>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="College Types"
          data={data}
          onEdit={collegeType =>
            navigate(masterUrls.collegeType.edit(collegeType.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            {
              header: 'Action',
              sortable: false,
              cell: (item: CollegeMaster.CollegeTypeItem) => (
                <Button
                  icon="trash"
                  variant="danger"
                  onClick={() => handleDelete(item)}
                  size="small"
                />
              ),
            },
          ]}
          toolbar={
            <LinkButton
              label="Create"
              icon="plus"
              to={masterUrls.collegeType.create}
            />
          }
          searchBox
        />
      </Card>
      <Outlet />
    </Page>
  );
}
