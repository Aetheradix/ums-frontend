import { useCallback, useState } from 'react';
import { Button, StatusButton } from 'shared/components/buttons';
import { FormPopup } from 'shared/new-components';
import FormCard from 'shared/new-components/FormCard';
import FormPage from 'shared/new-components/FormPage';
import GridPanel from 'shared/new-components/GridPanel';
import CreateProgrammeFee from '../components/CreateProgrammeFee';
import EditProgrammeFee from '../components/EditProgrammeFee';
import {
  useProgrammeFeeActiveStatusMutation,
  useProgrammeFeesQuery,
} from '../queries';

type PopupState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; id: number };

export default function List() {
  const { data, isLoading } = useProgrammeFeesQuery();
  console.log('Programme Fees:', data);
  const { mutateAsync: toggleStatus } = useProgrammeFeeActiveStatusMutation();

  const [popup, setPopup] = useState<PopupState>({
    mode: 'closed',
  });

  const handleToggleStatus = async (
    item: AffiliationMaster.ProgrammeFeeItem
  ) => {
    await toggleStatus({
      id: item.id,
      isActive: !item.isActive,
    });
  };

  const closePopup = useCallback(() => setPopup({ mode: 'closed' }), []);

  return (
    <FormPage
      title="Programme Fees"
      description="Manage the list of all programme fees in the system."
    >
      <FormCard>
        <GridPanel
          data={data as AffiliationMaster.ProgrammeFeeItem[]}
          loading={isLoading}
          onEdit={fee =>
            setPopup({
              mode: 'edit',
              id: fee.id,
            })
          }
          columns={[
            {
              cell: (_, fee) => <span>{fee.rowIndex + 1}</span>,
              width: '30px',
            },
            {
              field: 'programmeName',
              header: 'Programme Name',
            },
            {
              field: 'fixedDepositAmount',
              header: 'Fixed Deposit Amount',
            },
            {
              field: 'affiliationFee',
              header: 'Affiliation Fee',
            },
            {
              field: 'inspectionFee',
              header: 'Inspection Fee',
            },
            {
              field: 'otherFee',
              header: 'Other Fee',
              sortable: false,
            },
            {
              cell: (item: AffiliationMaster.ProgrammeFeeItem) => (
                <StatusButton
                  value={item.isActive}
                  onClick={() => handleToggleStatus(item)}
                />
              ),
            },
          ]}
          toolbar={
            <Button
              label="Add Programme Fee"
              icon="plus"
              variant="primary"
              onClick={() => setPopup({ mode: 'create' })}
            />
          }
          searchBox
        />
      </FormCard>

      {popup.mode === 'create' ? (
        <FormPopup
          visible
          onHide={closePopup}
          title="Add Programme Fee"
          subtitle="Fill in the details to add a new programme fee."
        >
          <CreateProgrammeFee onClose={closePopup} />
        </FormPopup>
      ) : null}

      {popup.mode === 'edit' ? (
        <FormPopup
          visible
          onHide={closePopup}
          title="Edit Programme Fee"
          subtitle="Update the details of the programme fee."
        >
          <EditProgrammeFee id={popup.id} onClose={closePopup} />
        </FormPopup>
      ) : null}
    </FormPage>
  );
}
