import { Outlet, useNavigate } from 'react-router-dom';
import { Card, Page } from 'shared/components/panels';
import { GridPanel } from 'shared/new-components';
import { Button } from 'shared/components/buttons';
import { useStudentAdditionalInformationsQuery } from '../queries';
import { sisUrls } from '../../urls';

export default function List() {
  const navigate = useNavigate();
  const { data, isLoading } = useStudentAdditionalInformationsQuery();

  return (
    <Page
      header="Student Additional Information"
      subHeader="Manage additional details for students including emergency contacts and notifications."
    >
      <Card>
        <GridPanel
          data={data}
          loading={isLoading}
          onEdit={(item: SIS.StudentAdditionalInformationItem) =>
            navigate(sisUrls.studentAdditionalInformation.edit(item.id))
          }
          columns={[
            {
              header: 'Student ID',
              field: 'studentId',
            },
            {
              header: 'Name',
              field: 'emergencyContactName',
            },
            {
              header: 'Contact',
              field: 'emergencyContact',
            },
            {
              header: 'Relation',
              field: 'emergencyRelation',
            },
          ]}
          toolbar={
            <Button
              label="Add"
              icon="plus"
              onClick={() => navigate('create')}
            />
          }
        />
      </Card>
      <Outlet />
    </Page>
  );
}
