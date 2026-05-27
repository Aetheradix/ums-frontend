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
  value?: File | string | null;
  preview?: string | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  showPreview?: boolean;
  previewWidth?: number;
  previewHeight?: number;
  uploadNote?: string;
  mode?: 'photo' | 'file';
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
  mode = 'photo',
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

  const handleClear = () => {
    setSelectedFileName(null);
    setLocalPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange?.(null);
  };

  const displayUrl = getPhotoUrl(localPreview);
  const fileNameToShow = value
    ? typeof value === 'string'
      ? value.split('/').pop()
      : (value as File).name
    : selectedFileName;

  if (mode === 'file') {
    let fileIcon = 'pi pi-file';
    if (fileNameToShow) {
      const lowerName = fileNameToShow.toLowerCase();
      if (lowerName.endsWith('.pdf')) {
        fileIcon = 'pi pi-file-pdf text-red-500';
      } else if (
        lowerName.endsWith('.jpg') ||
        lowerName.endsWith('.jpeg') ||
        lowerName.endsWith('.png') ||
        lowerName.endsWith('.gif')
      ) {
        fileIcon = 'pi pi-image text-blue-500';
      } else if (lowerName.endsWith('.doc') || lowerName.endsWith('.docx')) {
        fileIcon = 'pi pi-file-word text-blue-600';
      }
    }

    return (
      <InputBlock
        label={label}
        id={inputId}
        errorMessage={errorMessage}
        required={required}
      >
        <div className="w-full">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={accept}
            onChange={handleFileChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-between border border-dashed border-gray-300 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 hover:border-primary transition-all duration-200 cursor-pointer shadow-sm"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex-shrink-0 flex items-center justify-center bg-white border rounded-md w-10 h-10 shadow-xs">
                <i className={`${fileIcon} text-xl`} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-700 truncate">
                  {fileNameToShow || 'No file selected'}
                </span>
                {uploadNote && (
                  <span className="text-xs text-gray-400 truncate">
                    {uploadNote}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Button
                label={fileNameToShow ? 'Change' : 'Choose'}
                icon={fileNameToShow ? 'refresh' : 'plus'}
                variant="outlined"
                type="button"
                className="pointer-events-none"
              />
              {fileNameToShow && (
                <span
                  onClick={e => {
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  <Button
                    icon="trash"
                    variant="outlined"
                    type="button"
                    className="text-red-500 hover:bg-red-50 hover:border-red-200"
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </InputBlock>
    );
  }

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
