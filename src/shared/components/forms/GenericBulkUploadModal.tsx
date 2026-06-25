import { useState } from 'react';
import { ApiService, ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { FileUpload } from 'shared/components/forms';
import { Modal } from 'shared/components/popups';

export interface GenericBulkUploadModalProps {
  visible: boolean;
  onHide: () => void;
  onSuccess: () => void;
  title: string;
  uploadApiUrl: string;
  templateDownloadUrl?: string;
}

export default function GenericBulkUploadModal({
  visible,
  onHide,
  onSuccess,
  title,
  uploadApiUrl,
  templateDownloadUrl,
}: GenericBulkUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      ToastService.error('Please select a file to upload.', 'File Required');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Assuming ApiService.postFormData can handle FormData and adjusts headers accordingly
      await ApiService.postFormData(uploadApiUrl, formData);
      ToastService.success('Data imported successfully!');
      onSuccess();
      onHide();
      setFile(null); // Reset after success
    } catch (error) {
      ToastService.error(
        'Failed to upload the data. Please check the file format and try again.',
        'Upload Failed'
      );
      console.error('Bulk upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    setFile(null);
    onHide();
  };

  return (
    <Modal header={title} visible={visible} onHide={handleClose} size="small">
      <div className="flex flex-col gap-4">
        {templateDownloadUrl && (
          <div className="flex justify-between items-center bg-blue-50 p-3 rounded-md">
            <span className="text-sm text-blue-800">
              Download the template to see the required format.
            </span>
            <a
              href={templateDownloadUrl}
              download
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1"
            >
              <i className="pi pi-download" />
              Template
            </a>
          </div>
        )}

        <FileUpload
          id="bulk-upload-file"
          name="bulk-upload-file"
          mode="file"
          accept=".xlsx,.xls,.csv"
          onChange={uploadedFile => setFile(uploadedFile as File)}
          uploadNote="Supported formats: .xlsx, .csv. Max size: 10MB."
          maxSizeKB={10240}
        />

        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            label="Cancel"
            variant="outlined"
            onClick={handleClose}
            disabled={isUploading}
          />
          <Button
            type="button"
            label={isUploading ? 'Uploading...' : 'Import Data'}
            variant="primary"
            icon={isUploading ? 'pi pi-spin pi-spinner' : 'pi pi-upload'}
            onClick={handleUpload}
            disabled={!file || isUploading}
          />
        </div>
      </div>
    </Modal>
  );
}
