import { useEffect } from 'react';
import type { Control, UseFormSetValue, Path } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { FileUpload, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import { generateApplicationNumber } from '../utils';

interface CollegeEnclosureStepProps {
  register: (
    name: Path<AffiliationManagementSystem.CollegeApplicationFormData>
  ) => {
    control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
    name: Path<AffiliationManagementSystem.CollegeApplicationFormData>;
  };
  control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
  setValue: UseFormSetValue<AffiliationManagementSystem.CollegeApplicationFormData>;
}

export default function CollegeEnclosureStep({
  register,
  control,
  setValue,
}: CollegeEnclosureStepProps) {
  const collegeCode = useWatch({ control, name: 'collegeCode' }) || '';
  const applicationNumber = useWatch({ control, name: 'applicationNumber' });

  useEffect(() => {
    const codePrefix = collegeCode.slice(-3).toUpperCase();
    const shouldRegenerate =
      !applicationNumber ||
      (codePrefix && !applicationNumber.startsWith(codePrefix));

    if (shouldRegenerate) {
      const newAppNo = generateApplicationNumber(collegeCode);
      setValue('applicationNumber', newAppNo, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [applicationNumber, collegeCode, setValue]);

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Application Details" icon="id-card">
        <FormGrid columns={2}>
          <TextBox
            label="Application Number"
            subLabel="This is your unique application number."
            {...register('applicationNumber')}
            disabled
            placeholder="Auto-generated application number"
          />
        </FormGrid>
      </FormCard>

      <FormCard
        title="Enclosure (All enclosures to be submitted in hard copy)"
        icon="folder-open"
      >
        <FormGrid columns={1}>
          {/* File Uploads */}
          <div className="flex flex-col gap-6">
            <FileUpload
              label="Attach scanned copy of NOC of MP Government in .pdf format (maximum size 250 KB)"
              name="nocFile"
              control={control}
              accept=".pdf"
              mode="file"
              uploadNote="*PDF format only, maximum size 250 KB"
              required
            />

            <FileUpload
              label="Attach scanned copy of Affidavit in .pdf format (maximum size 250 KB)"
              name="affidavitFile"
              control={control}
              accept=".pdf"
              mode="file"
              uploadNote="*PDF format only, maximum size 250 KB"
              required
            />

            <FileUpload
              label="Attach scanned copy of relevant regular authority letter for professional course in .pdf format (maximum size 250 KB)"
              name="regularAuthorityFile"
              control={control}
              accept=".pdf"
              mode="file"
              uploadNote="*PDF format only, maximum size 250 KB (Optional)"
            />
          </div>
        </FormGrid>
      </FormCard>
    </div>
  );
}
