import { FileUpload as PrimeFileUpload } from 'primereact/fileupload';
import { useEffect, useState } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { ToastService } from 'services';
import { getPhotoUrl } from 'shared/utils/photoUrl';
import InputBlock from './InputBlock';

interface FileUploadProps<TForm extends FieldValues>
  extends Controls.FormProps<TForm>,
    Controls.InputBlockProps,
    Controls.InputProps {
  value?: File | null;
  preview?: string | null;
  onChange?: (file: File | null) => void;
  maxSizeKB?: number;
  accept?: string;
  mode?: 'basic' | 'advanced';
  showPreview?: boolean;
  previewWidth?: number;
  previewHeight?: number;
  uploadNote?: string;
}

function InnerFileUpload({
  id,
  name,
  errorMessage,
  label,
  onChange,
  required,
  maxSizeKB = 500,
  accept = 'image/*',
  mode = 'basic',
  showPreview = true,
  previewWidth = 100,
  previewHeight = 120,
  preview,
  uploadNote,
  ...rest
}: FileUploadProps<FieldValues>) {
  const inputId = id ?? name;
  const [uploadKey, setUploadKey] = useState(0);
  const [localPreview, setLocalPreview] = useState<string | null>(
    preview ?? null
  );

  useEffect(() => {
    if (preview) {
      setLocalPreview(preview);
    }
  }, [preview]);

  const handleSelect = (e: { files: File[] }) => {
    const file = e.files[0];
    if (!file) return;

    const isImageExpected =
      accept.includes('image') ||
      accept.includes('.jpg') ||
      accept.includes('.png');
    if (isImageExpected && !file.type.startsWith('image/')) {
      ToastService.error('Please select a valid image');
      setUploadKey(prev => prev + 1);
      return;
    }

    if (file.size > maxSizeKB * 1024) {
      ToastService.error(`File size must be less than ${maxSizeKB} KB`);
      setUploadKey(prev => prev + 1);
      return;
    }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result as string);
        onChange?.(file);
        setUploadKey(prev => prev + 1);
      };
      reader.readAsDataURL(file);
    } else {
      onChange?.(file);
      setUploadKey(prev => prev + 1);
    }
  };

  const handleClear = () => {
    setLocalPreview(null);
    onChange?.(null);
    setUploadKey(prev => prev + 1);
  };

  const handleValidationFail = (file: File) => {
    if (file.size > maxSizeKB * 1024) {
      ToastService.error(`File size must be less than ${maxSizeKB} KB`);
    } else {
      const isImageExpected =
        accept.includes('image') ||
        accept.includes('.jpg') ||
        accept.includes('.png');
      ToastService.error(
        isImageExpected
          ? 'Please select a valid image'
          : 'Invalid file selected'
      );
    }
    setUploadKey(prev => prev + 1);
  };

  const displayUrl = getPhotoUrl(localPreview);
  const iconSize = Math.min(previewWidth, previewHeight) * 0.5;

  return (
    <InputBlock
      label={label}
      id={inputId}
      errorMessage={errorMessage}
      required={required}
    >
      <div className="flex flex-column align-items-center gap-3">
        <div className="flex flex-column align-items-center mb-2">
          {showPreview && (
            <div
              className="flex align-items-center justify-content-centerSurface-0"
              style={{
                width: previewWidth,
                height: previewHeight,
                border: '2px solid #ffffff',
                borderRadius: '6px',
                backgroundColor: '#f8f9fa',
                overflow: 'hidden',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {displayUrl ? (
                <img
                  src={displayUrl}
                  alt="Preview"
                  onError={() => setLocalPreview(null)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <i
                  className="pi pi-user"
                  style={{
                    fontSize: `${iconSize}px`,
                    color: '#dee2e6',
                  }}
                />
              )}
            </div>
          )}

          <PrimeFileUpload
            key={uploadKey}
            id={inputId}
            name={name}
            mode={mode}
            accept={accept}
            maxFileSize={maxSizeKB * 1024}
            onSelect={handleSelect}
            onClear={handleClear}
            onValidationFail={handleValidationFail}
            chooseLabel="Choose"
            uploadLabel="Upload"
            cancelLabel="Cancel"
            auto={false}
            customUpload
            {...rest}
          />

          {uploadNote && (
            <small
              style={{
                color: 'red',
                marginTop: '4px',
                display: 'block',
                fontSize: '11px',
                textAlign: 'center',
              }}
            >
              {uploadNote}
            </small>
          )}
        </div>
      </div>
    </InputBlock>
  );
}

export default function FileUpload<TForm extends FieldValues>({
  name,
  control,
  errorMessage,
  onChange,
  uploadNote,
  ...rest
}: FileUploadProps<TForm>) {
  if (!control || !name) {
    return (
      <InnerFileUpload
        name={name}
        errorMessage={errorMessage}
        onChange={onChange}
        uploadNote={uploadNote}
        {...rest}
      />
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => (
        <InnerFileUpload
          {...rest}
          {...field}
          uploadNote={uploadNote}
          errorMessage={formState.errors[name]?.message?.toString()}
        />
      )}
    />
  );
}
