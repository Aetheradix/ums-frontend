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
                  className="border shadow-sm rounded-md"
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
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold text-lg border-b pb-2 mb-4 text-gray-800">
                College Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <span className="block text-sm text-gray-500">
                    College Code
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.collegeCode || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    Establishment Year
                  </span>
                  <span className="font-medium text-gray-900">
                    {(previewData as any).establishmentYear ||
                      previewData.establishmentYearId ||
                      'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    College Name
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.collegeName || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    College Address
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.collegeAddress || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    Telephone No.
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.telephoneNo || 'N/A'}
                  </span>
                </div>
                <div className="break-all">
                  <span className="block text-sm text-gray-500">
                    College Email
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.collegeEmail || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    College Category
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.collegeCategory || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    College Type
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.collegeType || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    College Area
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.collegeArea || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    Accommodation Type
                  </span>
                  <span className="font-medium text-gray-900">
                    {previewData.accommodationType || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">
                    Any Deficiency
                  </span>
                  <span className="font-medium text-gray-900">
                    {(previewData as any).deficiencyEarlierRaisedByCommittee
                      ? 'Yes'
                      : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {previewData.otherDetail && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-semibold text-lg border-b pb-2 mb-4 text-gray-800">
                  Other Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <span className="block text-sm text-gray-500">
                      Principal Name
                    </span>
                    <span className="font-medium text-gray-900">
                      {previewData.otherDetail.principalDirectorName || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Mobile No.
                    </span>
                    <span className="font-medium text-gray-900">
                      {previewData.otherDetail.principalMobileNo || 'N/A'}
                    </span>
                  </div>
                  <div className="break-all">
                    <span className="block text-sm text-gray-500">Email</span>
                    <span className="font-medium text-gray-900">
                      {previewData.otherDetail.principalEmail || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Society Name
                    </span>
                    <span className="font-medium text-gray-900">
                      {previewData.otherDetail.societyName || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Secretary Name
                    </span>
                    <span className="font-medium text-gray-900">
                      {previewData.otherDetail.secretaryName || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Society Registration No.
                    </span>
                    <span className="font-medium text-gray-900">
                      {previewData.otherDetail.societyRegistrationNo || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Society Date of Registration
                    </span>
                    <span className="font-medium text-gray-900">
                      {previewData.otherDetail.societyRegistrationDate
                        ? new Date(
                            previewData.otherDetail.societyRegistrationDate
                          ).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                </div>
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
