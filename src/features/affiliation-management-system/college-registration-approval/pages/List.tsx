import { useState } from 'react';
import { Button } from 'shared/components/buttons';
import { Loader } from 'shared/components/progress';
import {
  FormCard,
  FormPage,
  FormPopup,
  GridPanel,
} from 'shared/new-components';
import { formatDate } from 'shared/utils/dateUtils';
import { useRegistrationApprovalForm } from '../components/form.hook';
import { RegistrationApprovalForm } from '../components/RegistrationApprovalForm';
import {
  useCollegeRegistrationApprovalsQuery,
  useCollegeRegistrationByIdQuery,
} from '../queries';

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

  const [previewId, setPreviewId] = useState<number | null>(null);

  const { data: previewData, isLoading: isPreviewLoading } =
    useCollegeRegistrationByIdQuery(previewId);

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
              field: 'applicationNumber',
              header: 'Application Number',
              cell: (item: ApprovalItem) => (
                <span>{item.applicationNumber || '-'}</span>
              ),
            },
            {
              field: 'createdOn',
              header: 'Action Date',
              cell: (item: ApprovalItem) => (
                <span>{formatDate(item.createdOn)}</span>
              ),
            },

            {
              header: 'Preview',
              sortable: false,
              cell: (item: ApprovalItem) => (
                <Button
                  label="Preview"
                  variant="text"
                  onClick={() => setPreviewId(item.collegeRegistrationId)}
                />
              ),
            },

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

      <FormPopup
        visible={previewId !== null}
        onHide={() => setPreviewId(null)}
        title="Registration Preview"
        subtitle="Detailed view of the college registration data."
      >
        {isPreviewLoading ? (
          <Loader />
        ) : previewData ? (
          <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <h3 className="font-bold mb-2">College Details</h3>
              <p>
                <strong>College Code:</strong>{' '}
                {previewData.collegeCode || 'N/A'}
              </p>
              <p>
                <strong>Establishment Year:</strong>{' '}
                {(previewData as any).establishmentYear ||
                  previewData.establishmentYearId ||
                  'N/A'}
              </p>
              <p>
                <strong>College Name:</strong>{' '}
                {previewData.collegeName || 'N/A'}
              </p>
              <p>
                <strong>College Address:</strong>{' '}
                {previewData.collegeAddress || 'N/A'}
              </p>
              {/* <p>
                <strong>District:</strong>{' '}
                {(previewData as any).districtName ||
                  previewData.districtId ||
                  'N/A'}
              </p> */}
              <p>
                <strong>Telephone No.:</strong>{' '}
                {previewData.telephoneNo || 'N/A'}
              </p>
              <p className="break-all">
                <strong>College Email:</strong>{' '}
                {previewData.collegeEmail || 'N/A'}
              </p>
              <p>
                <strong>College Category:</strong>{' '}
                {previewData.collegeCategory || 'N/A'}
              </p>
              <p>
                <strong>College Type:</strong>{' '}
                {previewData.collegeType || 'N/A'}
              </p>
              <p>
                <strong>College Area:</strong>{' '}
                {previewData.collegeArea || 'N/A'}
              </p>
              <p>
                <strong>Accommodation Type:</strong>{' '}
                {previewData.accommodationType || 'N/A'}
              </p>
              {/* <p>
                <strong>No. of Classrooms:</strong>{' '}
                {previewData.numberOfClassRooms || 'N/A'}
              </p> */}
              {/* <p>
                <strong>Available Facility:</strong>{' '}
                {(previewData as any).availableFacilities?.join(', ') || 'N/A'}
              </p> */}
              <p>
                <strong>Any Deficiency:</strong>{' '}
                {(previewData as any).deficiencyEarlierRaisedByCommittee
                  ? 'Yes'
                  : 'No'}
              </p>
            </div>

            {previewData.otherDetail && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">Other Details</h3>
                <p>
                  <strong>Principal Name:</strong>{' '}
                  {previewData.otherDetail.principalDirectorName || 'N/A'}
                </p>
                <p>
                  <strong>Mobile No.:</strong>{' '}
                  {previewData.otherDetail.principalMobileNo || 'N/A'}
                </p>
                <p className="break-all">
                  <strong>Email:</strong>{' '}
                  {previewData.otherDetail.principalEmail || 'N/A'}
                </p>
                <p>
                  <strong>Society Name:</strong>{' '}
                  {previewData.otherDetail.societyName || 'N/A'}
                </p>
                <p>
                  <strong>Secretary Name:</strong>{' '}
                  {previewData.otherDetail.secretaryName || 'N/A'}
                </p>
                <p>
                  <strong>Society Registration No.:</strong>{' '}
                  {previewData.otherDetail.societyRegistrationNo || 'N/A'}
                </p>
                <p>
                  <strong>Society Date of Registration:</strong>{' '}
                  {previewData.otherDetail.societyRegistrationDate
                    ? new Date(
                        previewData.otherDetail.societyRegistrationDate
                      ).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            )}

            {previewData.courseDetails &&
              previewData.courseDetails.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-bold mb-2">Course Details</h3>
                  <table className="w-full text-left">
                    <thead>
                      <tr>
                        <th className="border-b p-2">Course Detail ID</th>
                        <th className="border-b p-2">
                          Programme/Fees Mapping ID
                        </th>
                        <th className="border-b p-2">Total Amount</th>
                        <th className="border-b p-2">Fee Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.courseDetails.map(course => (
                        <tr key={course.collegeCourseDetailId}>
                          <td className="border-b p-2">
                            {course.collegeCourseDetailId}
                          </td>
                          <td className="border-b p-2">
                            {course.programmeFeesMappingId}
                          </td>
                          <td className="border-b p-2">
                            ₹{course.totalAmount}
                          </td>
                          <td className="border-b p-2">
                            {course.isFeePaid ? 'Yes' : 'No'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            {previewData.documents && previewData.documents.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">Enclosures (Documents)</h3>
                <ul className="list-disc pl-5">
                  {previewData.documents.map(doc => (
                    <li key={doc.collegeAffiliationDocumentId}>
                      <span>{doc.documentType || 'Document'}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <Button
                label="Close"
                variant="outlined"
                onClick={() => setPreviewId(null)}
              />
            </div>
          </div>
        ) : (
          <p>No preview data available.</p>
        )}
      </FormPopup>
    </FormPage>
  );
}
