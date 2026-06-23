import { Button } from 'primereact/button';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Receipt() {
  const navigate = useNavigate();
  const location = useLocation();

  const receiptData = location.state?.receiptData;

  const handlePrint = () => {
    window.print();
  };

  if (!receiptData) {
    return (
      <div className="p-6 text-center text-red-500">
        Receipt data not found. Please initiate the payment process again.
      </div>
    );
  }

  return (
    <div className="flex justify-center p-6 bg-surface-base min-h-screen">
      <div className="w-[45vw] min-w-[500px]">
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

        {/* Receipt Panel */}
        <div className="form-popup-panel print-fullscreen-panel w-full shadow-lg">
          {/* Header */}
          <div className="form-popup-header border-b border-line pb-4 mb-6">
            <div className="form-popup-header-left">
              <h2 className="form-popup-title m-0">University ERP System</h2>
              <p className="form-popup-subtitle m-0 mt-1">
                Official Payment Receipt
              </p>
            </div>
            <div className="text-right flex items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                <i className="pi pi-check-circle"></i>
                SUCCESS
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="form-popup-body">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div className="flex flex-col">
                  <span className="text-secondary mb-1">Transaction ID</span>
                  <span className="font-medium text-main">
                    {receiptData.transactionId}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary mb-1">
                    Application Number
                  </span>
                  <span className="font-medium text-main">
                    {receiptData.applicationNumber}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary mb-1">College Name</span>
                  <span className="font-medium text-main">
                    {receiptData.collegeName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary mb-1">College Code</span>
                  <span className="font-medium text-main">
                    {receiptData.collegeCode}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary mb-1">
                    Payment Date & Time
                  </span>
                  <span className="font-medium text-main">
                    {receiptData.date}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary mb-1">Payment Method</span>
                  <span className="font-medium text-main">Online</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-secondary mb-1">Email</span>
                  <span className="font-medium text-main">
                    {receiptData.email}
                  </span>
                </div>
              </div>

              <div className="mt-2 bg-surface-main border border-line rounded-lg p-4 flex justify-between items-center">
                <span className="text-main font-semibold">Total Amount</span>
                <span className="text-2xl text-primary font-bold">
                  ₹{receiptData.totalAmount?.toLocaleString() ?? 0}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-secondary mt-8 pt-4 border-t border-line flex flex-col gap-1">
              <span>
                This is a computer-generated receipt and does not require a
                signature.
              </span>
              <span>
                For any queries, please contact support@universityerp.edu
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
