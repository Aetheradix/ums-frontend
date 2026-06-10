import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import { FormCard, FormPage, GridPanel } from 'shared/new-components';
import { useCollegeRegistrationApprovalsQuery } from '../queries';
import { useRegistrationApprovalForm } from '../components/form.hook';
import { RegistrationApprovalForm } from '../components/RegistrationApprovalForm';

type ApprovalItem = AffiliationManagementSystem.CollegeRegistrationApprovalItem;

const APPROVAL_STATUS_LABEL: Record<number, string> = {
  1: 'Pending',
  2: 'Approved',
  3: 'Rejected',
};

export default function List() {
  const { data, isLoading } = useCollegeRegistrationApprovalsQuery();
  const {
    isPending,
    rejectingId,
    rejectionReason,
    setRejectionReason,
    handleApprove,
    handleOpenReject,
    handleCloseReject,
    handleRejectSubmit,
  } = useRegistrationApprovalForm();

  return (
    <FormPage
      title="College Registration Approvals"
      description="Manage, review, and approve or reject college registrations."
    >
      <FormCard>
        {isLoading ? <Loader /> : undefined}
        <GridPanel
          data={data}
          columns={[
            {
              cell: (_, option) => <span>{option.rowIndex + 1}</span>,
              width: '30px',
            },
            { field: 'collegeName', header: 'College Name' },
            { field: 'collegeCategory', header: 'Category' },
            {
              field: 'approvalStatus',
              header: 'Approval Status',
              cell: (item: ApprovalItem) => (
                <span>
                  {APPROVAL_STATUS_LABEL[item.approvalStatus] ?? 'Pending'}
                  {item.approvalStatus === 3 && item.rejectionReason
                    ? ` — ${item.rejectionReason}`
                    : ''}
                </span>
              ),
            },
            {
              header: 'Actions',
              sortable: false,
              cell: (item: ApprovalItem) => {
                if (item.approvalStatus !== 1) {
                  return <span>-</span>;
                }
                return (
                  <>
                    <Button
                      label="Approve"
                      variant="primary"
                      onClick={() => handleApprove(item.collegeRegistrationId)}
                    />
                    <Button
                      label="Reject"
                      variant="outlined"
                      onClick={() =>
                        handleOpenReject(item.collegeRegistrationId)
                      }
                    />
                  </>
                );
              },
            },
          ]}
          searchBox
        />
      </FormCard>

      <RegistrationApprovalForm
        visible={rejectingId !== null}
        isPending={isPending}
        rejectionReason={rejectionReason}
        onReasonChange={setRejectionReason}
        onClose={handleCloseReject}
        onSubmit={handleRejectSubmit}
      />
    </FormPage>
  );
}
