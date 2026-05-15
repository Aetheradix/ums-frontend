import React, { useEffect, useState } from 'react';
import { Controller, type FieldValues } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { getPhotoUrl } from 'shared/utils/photoUrl';
import InputBlock from './InputBlock';

interface FileUploadProps<TForm extends FieldValues>
  extends
    Controls.FormProps<TForm>,
    Controls.InputBlockProps,
    Controls.InputProps {
  value?: File | null;
  preview?: string | null;
  onChange?: (file: File | null) => void;
  accept?: string;
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
  accept = 'image/*',
  showPreview = true,
  previewWidth = 100,
  previewHeight = 120,
  preview,
  uploadNote,
  value,
}: FileUploadProps<FieldValues>) {
  const inputId = id ?? name;
  const [localPreview, setLocalPreview] = useState<string | null>(
    preview ?? null
  );
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  useEffect(() => {
    setLocalPreview(preview ?? null);
    if (!preview) setSelectedFileName(null);
  }, [preview]);

  // Sync with form value (important for Reset)
  useEffect(() => {
    if (!value) {
      setLocalPreview(preview ?? null);
      setSelectedFileName(null);
    }
  }, [value, preview]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFileName(file.name);
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalPreview(reader.result as string);
        onChange?.(file);
      };
      reader.readAsDataURL(file);
    } else {
      setLocalPreview(null);
      onChange?.(file);
    }
  };

  const displayUrl = getPhotoUrl(localPreview);

  return (
    <InputBlock
      label={label}
      id={inputId}
      errorMessage={errorMessage}
      required={required}
    >
      <div className="flex flex-col items-center justify-center">
        {showPreview && (displayUrl || selectedFileName) && (
          <div
            className="file-upload-preview flex items-center justify-center surface-0"
            style={
              {
                '--preview-width': `${previewWidth}px`,
                '--preview-height': `${previewHeight}px`,
              } as React.CSSProperties
            }
          >
            {displayUrl ? (
              <img
                src={displayUrl}
                alt="Preview"
                className="w-full h-full"
                style={{ objectFit: 'cover' } as React.CSSProperties}
                onError={() => setLocalPreview(null)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <i className="pi pi-file file-upload-icon" />
                <span className="file-upload-filename">{selectedFileName}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col items-center">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />

          <Button
            label="Choose"
            icon="plus"
            variant="primary"
            onClick={() => fileInputRef.current?.click()}
          />

          {uploadNote && (
            <small className="file-upload-note">{uploadNote}</small>
          )}
        </div>
      </div>
    </InputBlock>
  );
}

export default function FileUpload<TForm extends FieldValues>(
  props: FileUploadProps<TForm>
) {
  const { name, control } = props;

  if (!control || !name) {
    return (
      <InnerFileUpload
        {...(props as unknown as FileUploadProps<FieldValues>)}
      />
    );
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => (
        <InnerFileUpload
          {...(props as unknown as FileUploadProps<FieldValues>)}
          {...field}
          errorMessage={formState.errors[name]?.message?.toString()}
        />
      )}
    />
  );
}
