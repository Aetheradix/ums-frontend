import {
  SelectAccommodationType,
  SelectCollegeArea,
  SelectCollegeCategory,
  SelectCollegeType,
  SelectDeficiencyStatus,
  SelectEstablishmentYear,
  SelectYesNo,
} from 'features/components';
import SelectDistrict from 'features/components/SelectDistrict';
import { useAvailableFacilitiesQuery } from 'features/master/college/college-facility/queries';
import type { Control, Path } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import {
  CheckboxList,
  NumberBox,
  TextArea,
  TextBox,
} from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

interface CollegeRegistrationStepProps {
  register: (
    key: Path<AffiliationManagementSystem.CollegeApplicationFormData>
  ) => {
    control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
    name: Path<AffiliationManagementSystem.CollegeApplicationFormData>;
  };
  control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
}

export default function CollegeRegistrationStep({
  register,
  control,
}: CollegeRegistrationStepProps) {
  const watchedDeficiency = useWatch({
    control,
    name: 'deficiencyEarlierRaisedByCommittee',
  });

  const watchedStatus = useWatch({
    control,
    name: 'deficiencyStatus',
  });

  const { data: facilityData } = useAvailableFacilitiesQuery();
  const facilityOptions =
    facilityData?.filter(
      (f: CollegeMaster.AvailableFacilityItem) => f.isActive
    ) || [];

  return (
    <FormCard title="College Details" icon="building">
      <FormGrid columns={2}>
        <TextBox
          label="College Code"
          placeholder="College Code"
          {...register('collegeCode')}
          maxLength={15}
          required
        />
        <SelectEstablishmentYear
          label="Establishment year"
          defaultOptionText="Select Establishment year"
          {...register('establishmentYearId')}
          required
        />
        {/* Row 2 */}
        <div className="col-span-2 md:col-span-1">
          <TextBox
            label="College Name"
            placeholder="College Name"
            {...register('collegeName')}
            maxLength={200}
            required
          />
        </div>
        <div className="hidden md:block"></div>
        <div className="col-span-2">
          <TextArea
            label="College Address"
            placeholder="College Address"
            {...register('collegeAddress')}
            required
          />
        </div>

        <SelectDistrict
          label="District"
          defaultOptionText="Select District"
          {...register('districtId')}
          required
        />
        <TextBox
          label="Telephone No"
          subLabel="(Please write telephone number including STD CODE.)"
          placeholder="Telephone No"
          {...register('telephoneNo')}
          maxLength={20}
          required
        />
        <TextBox
          label="College Email"
          placeholder="College Email"
          {...register('collegeEmail')}
          maxLength={255}
          required
        />
        {/* Row 5 */}
        <SelectCollegeCategory
          label="College category"
          defaultOptionText="Select College category"
          {...register('collegeCategory')}
          required
        />
        <SelectCollegeType
          label="College type"
          defaultOptionText="Select College type"
          {...register('collegeType')}
          required
        />
        {/* Row 6 */}
        <SelectCollegeArea
          label="College Area"
          defaultOptionText="Select College area"
          {...register('collegeArea')}
          required
        />
        <SelectAccommodationType
          label="Accommodation type"
          defaultOptionText="Select Accommodation type"
          {...register('accommodationType')}
          required
        />
        {/* Row 7 */}
        <div className="col-span-2">
          <CheckboxList
            label="Available facilities"
            name="availableFacilities"
            control={control}
            options={facilityOptions}
            getLabel={opt => opt.facilityName}
            getValue={opt => opt.id}
            columns={4}
          />
        </div>
        {/* Row 8 */}
        <NumberBox
          label="Number of Class rooms"
          placeholder="Number of Class rooms"
          {...register('numberOfClassRooms')}
          required
        />
        <SelectYesNo
          label="If any deficiency earlier raised by the committee"
          defaultOptionText="Select Deficiency earlier raised by the committee"
          {...register('deficiencyEarlierRaisedByCommittee')}
          required
        />
        {watchedDeficiency === 'Yes' && (
          <SelectDeficiencyStatus
            label="Deficiency Status"
            defaultOptionText="Select Deficiency Status"
            {...register('deficiencyStatus')}
            required
          />
        )}
        {watchedDeficiency === 'Yes' && watchedStatus === 'Pending' && (
          <TextBox
            label="Deficiency Reason"
            placeholder="Deficiency Reason"
            {...register('deficiencyReason')}
            maxLength={500}
            required
          />
        )}
      </FormGrid>
    </FormCard>
  );
}
