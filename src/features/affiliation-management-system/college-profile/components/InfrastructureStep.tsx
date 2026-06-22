import { SelectYesNo } from 'features/components';
import type { Control, Path } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

interface InfrastructureStepProps {
  register: (
    key: Path<AffiliationManagementSystem.CollegeProfileWizardData>
  ) => {
    control: Control<AffiliationManagementSystem.CollegeProfileWizardData>;
    name: Path<AffiliationManagementSystem.CollegeProfileWizardData>;
  };
  control: Control<AffiliationManagementSystem.CollegeProfileWizardData>;
}

export default function InfrastructureStep({
  register,
  control,
}: InfrastructureStepProps) {
  const hostelAvailable = useWatch({
    control,
    name: 'hostelFacilityAvailable',
  });

  return (
    <FormCard
      title="Physical Infrastructure Details"
      subtitle="Details of college land, buildings, staff quarters, and hostel facilities."
      icon="map"
    >
      <FormGrid columns={2}>
        <TextBox
          label="Total Land Area (Acres) & Ownership"
          placeholder="e.g. 5 Acres, Owned"
          {...register('totalLandAreaOwned')}
          maxLength={255}
          required
        />

        <TextBox
          label="Total Number of Buildings"
          placeholder="e.g. 3"
          {...register('totalNumberOfBuildings')}
          maxLength={50}
          required
        />

        <TextBox
          label="Physical Education Facility (Sports/Gym)"
          placeholder="e.g. Sports grounds, gym hall"
          {...register('physicalEducationFacility')}
          maxLength={500}
          required
        />

        <SelectYesNo
          label="Hostel Facility Available?"
          defaultOptionText="Select Option"
          {...register('hostelFacilityAvailable')}
          required
        />

        <TextBox
          label="Staff Quarter Details"
          placeholder="e.g. 10 Quarters, Fully Occupied"
          {...register('staffQuarterDetails')}
          maxLength={500}
          required
        />
      </FormGrid>

      {hostelAvailable === 'Yes' && (
        <div className="mt-6 p-4 border border-blue-200 bg-blue-50/50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <i className="pi pi-home" /> Hostel Capacity Details
          </h4>
          <FormGrid columns={3}>
            <TextBox
              label="Boys Hostels Count"
              placeholder="e.g. 1"
              {...register('boysHostelsCount')}
            />

            <TextBox
              label="Girls Hostels Count"
              placeholder="e.g. 1"
              {...register('girlsHostelsCount')}
            />

            <TextBox
              label="Total Capacity (Students)"
              placeholder="e.g. 150"
              {...register('totalCapacity')}
            />
          </FormGrid>
        </div>
      )}
    </FormCard>
  );
}
