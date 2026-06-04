import { FormCard, FormPage } from 'shared/new-components';

export default function FeePayment() {
  return (
    <FormPage
      title="College Fee Payment"
      description="Pay your college fees online."
    >
      <FormCard title="College Fee Payment" icon="money">
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <i className="pi pi-spin pi-cog text-5xl mb-4" />
          <p className="text-lg font-medium">College Fee Payment</p>
          <p className="text-sm">This feature is coming soon.</p>
        </div>
      </FormCard>
    </FormPage>
  );
}
