import { FormPopup, FormActions } from 'shared/new-components';

interface PaymentConfirmationDialogProps {
  visible: boolean;
  onHide: () => void;
  onPayNow: () => void;
  details: {
    collegeName: string;
    collegeCode: string;
    applicationNumber: string;
    totalAmount: number;
    email: string;
    date: string;
  } | null;
}

export default function PaymentConfirmationDialog({
  visible,
  onHide,
  onPayNow,
  details,
}: PaymentConfirmationDialogProps) {
  if (!details) return null;

  return (
    <FormPopup
      visible={visible}
      onHide={onHide}
      title="Payment Confirmation"
      subtitle="Please verify the details below to complete your payment"
      className="w-[35vw]"
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
          <div className="flex flex-col">
            <span className="text-secondary mb-1">College Name</span>
            <span className="font-medium text-main">{details.collegeName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary mb-1">College Code</span>
            <span className="font-medium text-main">{details.collegeCode}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary mb-1">App Number</span>
            <span className="font-medium text-main">
              {details.applicationNumber}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary mb-1">Date</span>
            <span className="font-medium text-main">{details.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-secondary mb-1">Email</span>
            <span className="font-medium text-main">{details.email}</span>
          </div>
        </div>

        <div className="mt-2 bg-surface-main border border-line rounded-lg p-4 flex justify-between items-center">
          <span className="text-main font-semibold">Total Amount</span>
          <span className="text-2xl text-primary font-bold">
            ₹{details.totalAmount}
          </span>
        </div>
      </div>

      <FormActions saveLabel="Pay Now" onSave={onPayNow} onReset={onHide} />
    </FormPopup>
  );
}
