import { useWatch } from 'react-hook-form';
import type { Control, Path } from 'react-hook-form';
import SelectAcademicYearSession from 'features/components/SelectAcademicYearSession';
import SelectDistrict from 'features/components/SelectDistrict';
import {
  CheckboxList,
  DropDownList,
  NumberBox,
  TextArea,
  TextBox,
} from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

const collegeCategoryOptions = [
  { label: 'Government', value: 'Government' },
  { label: 'Private', value: 'Private' },
  { label: 'Aided', value: 'Aided' },
  { label: 'Un-Aided', value: 'Un-Aided' },
];

const collegeTypeOptions = [
  { label: 'Professional', value: 'Professional' },
  { label: 'Non-Professional', value: 'Non-Professional' },
];

const accommodationTypeOptions = [
  { label: 'Hostel', value: 'Hostel' },
  { label: 'Day Scholar', value: 'Day Scholar' },
  { label: 'Both', value: 'Both' },
];

const collegeAreaOptions = [
  { label: 'Urban', value: 'Urban' },
  { label: 'Rural', value: 'Rural' },
  { label: 'Semi-Urban', value: 'Semi-Urban' },
];

const deficiencyOptions = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

const deficiencyStatusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Removed', value: 'Removed' },
];

const facilityOptions = [
  { label: 'Library', value: 1 },
  { label: 'Laboratory', value: 2 },
  { label: 'Play Ground', value: 3 },
  { label: 'Boys Hostel', value: 4 },
  { label: 'Girls Hostel', value: 5 },
];

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

  return (
    <FormCard title="College Details" icon="building">
      <FormGrid columns={2}>
        {/* Row 1 */}
        <TextBox
          label="College Code"
          placeholder="College Code"
          {...register('collegeCode')}
          maxLength={50}
          required
        />
        <SelectAcademicYearSession
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
        {/* Row 4 */}
        <TextBox
          label="Telephone No"
          subLabel="(Please write telephone number including STD CODE.)"
          placeholder="Telephone No"
          {...register('telephoneNo')}
          maxLength={20}
          required
        />
        <TextBox
          label="College Email Id"
          placeholder="College Email Id"
          {...register('collegeEmail')}
          maxLength={255}
          required
        />
        {/* Row 5 */}
        <DropDownList
          label="College category"
          data={collegeCategoryOptions}
          textField="label"
          valueField="value"
          optionValue="value"
          defaultOptionText="Select College category"
          {...register('collegeCategory')}
          required
        />
        <DropDownList
          label="College type"
          data={collegeTypeOptions}
          textField="label"
          valueField="value"
          optionValue="value"
          defaultOptionText="Select College type"
          {...register('collegeType')}
          required
        />
        {/* Row 6 */}
        <DropDownList
          label="College Area"
          data={collegeAreaOptions}
          textField="label"
          valueField="value"
          optionValue="value"
          defaultOptionText="Select College area"
          {...register('collegeArea')}
          required
        />
        <DropDownList
          label="Accommodation type"
          data={accommodationTypeOptions}
          textField="label"
          valueField="value"
          optionValue="value"
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
            getLabel={opt => opt.label}
            getValue={opt => opt.value}
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
        <DropDownList
          label="If any deficiency earlier raised by the committee"
          data={deficiencyOptions}
          textField="label"
          valueField="value"
          optionValue="value"
          defaultOptionText="Select Deficiency earlier raised by the committee"
          {...register('deficiencyEarlierRaisedByCommittee')}
          required
        />
        {watchedDeficiency === 'Yes' && (
          <DropDownList
            label="Deficiency Status"
            data={deficiencyStatusOptions}
            textField="label"
            valueField="value"
            optionValue="value"
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
