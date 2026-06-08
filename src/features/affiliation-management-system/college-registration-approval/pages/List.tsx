import { useCallback, useState } from 'react';
import { ToastService } from 'services';
import { Loader } from 'shared/components/progress';
import { Button } from 'shared/components/buttons';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import { TextBox } from 'shared/components/forms';
import {
  useCollegeRegistrationApprovalsQuery,
  useUpdateCollegeRegistrationApprovalStatusMutation,
} from '../queries';

export default function List() {
  const { data, isLoading } = useCollegeRegistrationApprovalsQuery();
  const { mutateAsync: updateStatus, isPending } =
    useUpdateCollegeRegistrationApprovalStatusMutation();

  const [rejectingId, setRejectingId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleApprove = async (id: number) => {
    try {
      const success = await updateStatus({ id, status: 2 });
      if (success) {
        ToastService.success(
          'College registration request approved successfully.'
        );
      } else {
        ToastService.error('Failed to approve college registration.');
      }
    } catch {
      ToastService.error('An error occurred during approval.');
    }
  };

  const handleOpenReject = (id: number) => {
    setRejectingId(id);
    setRejectionReason('');
  };

  const handleCloseReject = useCallback(() => {
    setRejectingId(null);
    setRejectionReason('');
  }, []);

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      ToastService.error('Please enter a rejection reason.');
      return;
    }
    if (rejectingId === null) return;

    try {
      const success = await updateStatus({
        id: rejectingId,
        status: 3,
        rejectionReason: rejectionReason.trim(),
      });
      if (success) {
        ToastService.success('College registration request rejected.');
        handleCloseReject();
      } else {
        ToastService.error('Failed to reject college registration.');
      }
    } catch {
      ToastService.error('An error occurred during rejection.');
    }
  };

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
              field: 'approvelStatus',
              header: 'Approval Status',
              cell: (
                item: AffiliationManagementSystem.CollegeRegistrationApprovalItem
              ) => {
                if (item.approvelStatus === 2) {
                  return (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Approved
                    </span>
                  );
                }
                if (item.approvelStatus === 3) {
                  return (
                    <div className="flex flex-col gap-0.5">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 w-fit">
                        Rejected
                      </span>
                      {item.rejectionReason && (
                        <span
                          className="text-[10px] text-gray-500 italic max-w-[200px] truncate"
                          title={item.rejectionReason}
                        >
                          Reason: {item.rejectionReason}
                        </span>
                      )}
                    </div>
                  );
                }
                return (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Pending
                  </span>
                );
              },
            },
            {
              header: 'Actions',
              sortable: false,
              cell: (
                item: AffiliationManagementSystem.CollegeRegistrationApprovalItem
              ) => {
                if (item.approvelStatus !== 1) {
                  return <span className="text-gray-400 text-xs">-</span>;
                }
                return (
                  <div className="flex gap-2">
                    <Button
                      label="Approve"
                      variant="primary"
                      className="!py-1 !px-2.5 text-xs bg-green-600 border-green-600 hover:bg-green-700"
                      onClick={() => handleApprove(item.collegeRegistrationId)}
                    />
                    <Button
                      label="Reject"
                      variant="outlined"
                      className="!py-1 !px-2.5 text-xs border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() =>
                        handleOpenReject(item.collegeRegistrationId)
                      }
                    />
                  </div>
                );
              },
            },
          ]}
          searchBox
        />
      </FormCard>

      {/* Reject Dialog Popup */}
      <FormPopup
        visible={rejectingId !== null}
        onHide={handleCloseReject}
        title="Reject Registration"
        subtitle="Specify the reason for rejecting this college registration."
      >
        <div className="flex flex-col gap-4 mt-2">
          <TextBox
            label="Rejection Reason"
            placeholder="Type reason here..."
            value={rejectionReason}
            onChange={(val: string) => setRejectionReason(val)}
            required
            maxLength={200}
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button
              label="Cancel"
              variant="outlined"
              onClick={handleCloseReject}
            />
            <Button
              label="Submit Rejection"
              variant="primary"
              className="bg-red-600 border-red-600 hover:bg-red-700"
              onClick={handleRejectSubmit}
              isLoading={isPending}
            />
          </div>
        </div>
      </FormPopup>
    </FormPage>
  );
}
