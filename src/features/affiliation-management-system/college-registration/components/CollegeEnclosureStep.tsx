import type { Control } from 'react-hook-form';
import { CheckboxList, FileUpload } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

interface CollegeEnclosureStepProps {
  control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
}

const enclosureOptions = [
  { label: 'Society Registration letter', value: 1 },
  { label: "Teacher's list", value: 2 },
  { label: 'NOC of MP Government', value: 3 },
  { label: 'Affidavit', value: 4 },
  { label: 'Regular Authority letter for professional course', value: 5 },
];

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
          {/* Checkbox List for Enclosures */}
          <div className="mb-4">
            <CheckboxList
              label="Select Enclosures"
              name="enclosures"
              control={control}
              options={enclosureOptions}
              getLabel={opt => opt.label}
              getValue={opt => opt.value}
              columns={2}
            />
          </div>

          {/* File Uploads */}
          <div className="border-t border-gray-150 pt-6 flex flex-col gap-6">
            <FileUpload
              label="Attach scanned copy of NOC of MP Government in .pdf format (size between 50 KB to 250 KB)"
              name="nocFile"
              control={control}
              accept=".pdf"
              mode="file"
              uploadNote="*PDF format only, size between 50 KB to 250 KB"
              required
            />

            <FileUpload
              label="Attach scanned copy of Affidavit in .pdf format (size between 50 KB to 250 KB)"
              name="affidavitFile"
              control={control}
              accept=".pdf"
              mode="file"
              uploadNote="*PDF format only, size between 50 KB to 250 KB"
              required
            />

            <FileUpload
              label="Attach scanned copy of relevant regular authority letter for professional course in .pdf format (size between 50 KB to 250 KB)"
              name="regularAuthorityFile"
              control={control}
              accept=".pdf"
              mode="file"
              uploadNote="*PDF format only, size between 50 KB to 250 KB (Optional)"
            />
          </div>
        </FormGrid>
      </FormCard>
    </div>
  );
}
