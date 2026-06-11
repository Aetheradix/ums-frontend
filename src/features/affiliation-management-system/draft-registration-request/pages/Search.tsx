import { useEffect, useState } from 'react';
import { ToastService } from 'services';
import { FormCard, FormPage } from 'shared/new-components';
import DraftSearchForm from '../components/DraftRegistrationRequestForm';
import type { DraftSearchFormData } from '../components/form.hook';
import { useGetDraftRegistrationQuery } from '../queries';

export default function Search() {
  const [searchParams, setSearchParams] = useState<DraftSearchFormData | null>(
    null
  );

  const { data, isFetching, isError, isSuccess } = useGetDraftRegistrationQuery(
    searchParams?.applicationNumber || '',
    searchParams?.establishmentYear || 0
  );

  const handleSubmit = (formData: DraftSearchFormData) => {
    setSearchParams(formData);
  };

  useEffect(() => {
    if (isError) {
      ToastService.error(
        'Draft registration not found for the provided details.'
      );
    } else if (isSuccess && data) {
      ToastService.success('Draft registration data retrieved successfully.');
    }
  }, [isError, isSuccess, data]);

  return (
    <FormPage
      title="Draft Registration Request"
      description="Retrieve and edit a draft college registration using its application number."
    >
      <FormCard title="Search Draft">
        <DraftSearchForm onSubmit={handleSubmit} isFetching={isFetching} />
      </FormCard>

      {isSuccess && data && (
        <FormCard title="Draft Data Details">
          <div style={{ marginTop: '1rem' }}>
            <p>
              <strong>College Name:</strong> {data.collegeName}
            </p>
            <p>
              <strong>Code:</strong> {data.collegeCode}
            </p>
            <p style={{ color: '#2563eb', marginTop: '0.5rem' }}>
              Next step: This data will be passed to the full registration form!
            </p>
          </div>
        </FormCard>
      )}
    </FormPage>
  );
}
