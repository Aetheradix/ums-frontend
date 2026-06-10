import type { Control } from 'react-hook-form';
import { FileUpload } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

interface CollegeEnclosureStepProps {
  control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
}

export default function CollegeEnclosureStep({
  control,
}: CollegeEnclosureStepProps) {
  return (
    <div className="flex flex-col gap-6">
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
