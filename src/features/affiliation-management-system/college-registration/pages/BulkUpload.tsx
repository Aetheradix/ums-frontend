import { useState } from 'react';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FileUpload } from 'shared/components/forms';
import { FormCard, FormPage } from 'shared/new-components';
import { uploadBulkCollegeRegistration } from '../api';

export default function BulkUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      ToastService.error('Please select a file to upload first.');
      return;
    }

    setIsUploading(true);
    try {
      const { data, error } = await uploadBulkCollegeRegistration(file);

      if (error) {
        ToastService.error('Failed to upload file.');
      } else {
        ToastService.success(data?.message || 'File uploaded successfully.');
        setFile(null); // Reset after successful upload
      }
    } catch (err) {
      ToastService.error('An unexpected error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  const breadcrumbs = [
    {
      label: 'College Registration',
      path: '/affiliation-management-system/college-registration',
    },
    { label: 'Bulk Import' },
  ];

  return (
    <FormPage
      title="Bulk Import College Registrations"
      description="Upload an Excel or CSV file to import multiple college records at once."
      breadcrumbs={breadcrumbs}
      headerAction={
        <Button
          label="Download Template"
          icon="pi pi-download"
          variant="outlined"
          onClick={() => {
            // Optional: Implement template download logic
            ToastService.success('Template download will be available soon.');
          }}
        />
      }
    >
      <FormCard title="Upload File">
        <div className="flex flex-col gap-6 max-w-xl">
          <FileUpload
            label="Excel / CSV File"
            name="bulkUploadFile"
            mode="file"
            accept=".xlsx, .xls, .csv"
            value={file}
            onChange={setFile}
            uploadNote="Allowed formats: .xlsx, .csv. Max size: 5MB."
            maxSizeKB={5120}
          />

          <div className="flex justify-end mt-4">
            <Button
              label={isUploading ? 'Uploading...' : 'Upload Data'}
              icon={
                isUploading ? 'pi pi-spin pi-spinner' : 'pi pi-cloud-upload'
              }
              onClick={handleUpload}
              disabled={!file || isUploading}
            />
          </div>
        </div>
      </FormCard>
    </FormPage>
  );
}
