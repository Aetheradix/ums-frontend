import { useNavigate } from 'react-router';
import { Button } from 'shared/components/buttons';
import StatusButton from 'shared/components/buttons/StatusButton';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { masterUrls } from '../../../urls';
import {
  useQualificationActiveStatusMutation,
  useQualificationsQuery,
} from '../queries';

export default function List() {
  const { data, isLoading } = useQualificationsQuery();
  const navigate = useNavigate();
  const { mutateAsync } = useQualificationActiveStatusMutation();

  const handleToggleStatus = async (item: Master.QualificationItem) => {
    await mutateAsync({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  return (
    <FormPage
      title="Qualification"
      description="Manage the list of all qualifications in the system."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          title="Qualifications"
          data={data}
          onEdit={qualification =>
            navigate(masterUrls.qualification.edit(qualification.id))
          }
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'name', header: 'Name' },
            { field: 'subject', header: 'Subject' },
            { field: 'code', header: 'Code' },
            {
              field: 'isActive',
              header: 'Status',
              sortable: false,
              cell: (item: Master.QualificationItem) => (
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
              onClick={() => navigate(masterUrls.qualification.create)}
            />
          }
          searchBox
        />
      </FormCard>
    </FormPage>
  );
}
