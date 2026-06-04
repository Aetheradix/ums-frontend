import { FormCard, FormPage } from 'shared/new-components';

export default function SubjectSelection() {
  return (
    <FormPage
      title="Subject Selection"
      description="Select your subjects for the academic session."
    >
      <FormCard title="Subject Selection" icon="book">
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <i className="pi pi-spin pi-cog text-5xl mb-4" />
          <p className="text-lg font-medium">Subject Selection</p>
          <p className="text-sm">This feature is coming soon.</p>
        </div>
      </FormCard>
    </FormPage>
  );
}
