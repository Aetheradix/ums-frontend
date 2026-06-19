import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function Receipt() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock Data for the receipt
  const receiptData = {
    transactionId: id || 'TXN-987654321',
    applicationNumber: 'REG-2026-0045',
    collegeName: 'Global Institute of Technology',
    collegeCode: 'GIT001',
    paymentDate: new Date().toLocaleDateString(),
    paymentTime: new Date().toLocaleTimeString(),
    status: 'SUCCESS',
    paymentMethod: 'Net Banking',
    amount: 50000,
    email: 'contact@git.edu',
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-3xl">
        {/* Actions for Web View Only */}
        <div className="flex justify-between items-center mb-4 print:hidden">
          <Button
            label="Back to Home"
            icon="pi pi-arrow-left"
            className="p-button-text"
            onClick={() =>
              navigate('/affiliation-management-system/college-registration')
            }
          />
          <Button
            label="Print Receipt"
            icon="pi pi-print"
            className="p-button-primary"
            onClick={handlePrint}
          />
        </div>

        {/* Receipt Card */}
        <Card className="shadow-lg border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 m-0">
                University ERP System
              </h2>
              <p className="text-gray-500 m-0 mt-1">Official Payment Receipt</p>
            </div>
            <div className="text-right">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                <i className="pi pi-check-circle"></i>
                {receiptData.status}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 text-gray-700">
            <div>
              <p className="text-sm text-gray-500 m-0">Transaction ID</p>
              <p className="font-semibold text-lg m-0">
                {receiptData.transactionId}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 m-0">Application Number</p>
              <p className="font-semibold text-lg m-0">
                {receiptData.applicationNumber}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 m-0">College Name</p>
              <p className="font-medium m-0">
                {receiptData.collegeName} ({receiptData.collegeCode})
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 m-0">Email</p>
              <p className="font-medium m-0">{receiptData.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 m-0">Payment Date & Time</p>
              <p className="font-medium m-0">
                {receiptData.paymentDate} at {receiptData.paymentTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 m-0">Payment Method</p>
              <p className="font-medium m-0">{receiptData.paymentMethod}</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 m-0 mb-4 border-b pb-2">
              Payment Summary
            </h3>
            <div className="flex justify-between items-center mb-2 text-gray-600">
              <span>College Affiliation Fee</span>
              <span>₹{receiptData.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-gray-600">
              <span>Processing Fee</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300 text-gray-900 font-bold text-xl">
              <span>Total Amount Paid</span>
              <span>₹{receiptData.amount.toLocaleString()}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
            <p className="m-0">
              This is a computer-generated receipt and does not require a
              signature.
            </p>
            <p className="m-0">
              For any queries, please contact support@universityerp.edu
            </p>
          </div>
        </Card>
      </div>

      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .p-card, .p-card * {
              visibility: visible;
            }
            .p-card {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              border: none !important;
              box-shadow: none !important;
            }
          }
        `}
      </style>
    </div>
  );
}
