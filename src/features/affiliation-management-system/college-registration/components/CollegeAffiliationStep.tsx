import type { Control, Path } from 'react-hook-form';
import { DatePicker, DropDownList, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

const anotherCollegeOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

interface CollegeAffiliationStepProps {
  register: (
    key: Path<AffiliationManagementSystem.CollegeApplicationFormData>
  ) => {
    control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
    name: Path<AffiliationManagementSystem.CollegeApplicationFormData>;
  };
}

export default function CollegeAffiliationStep({
  register,
}: CollegeAffiliationStepProps) {
  return (
    <>
      <FormCard title="Other Details" icon="user">
        <FormGrid columns={2}>
          <TextBox
            label="Principal/Director Name"
            placeholder="Enter Principal/Director Name"
            {...register('principalDirectorName')}
            maxLength={100}
            required
          />
          <div className="hidden md:block"></div>

          <TextBox
            label="Mobile No"
            placeholder="Enter Mobile No"
            {...register('principalMobileNo')}
            maxLength={10}
            required
          />
          <TextBox
            label="Email Id"
            placeholder="Enter Email Id"
            {...register('principalEmail')}
            maxLength={70}
            required
          />
        </FormGrid>
      </FormCard>

      <FormCard title="Society/Committee Details" icon="building">
        <FormGrid columns={2}>
          <TextBox
            label="Society Name"
            placeholder="Enter Society Name"
            {...register('societyName')}
            maxLength={200}
            required
          />
          <TextBox
            label="Secretary Name"
            placeholder="Enter Secretary Name"
            {...register('secretaryName')}
            maxLength={100}
            required
          />
          <TextBox
            label="Society Registration No."
            placeholder="Enter Society Registration No."
            {...register('societyRegistrationNo')}
            maxLength={100}
            required
          />
          <DatePicker
            label="Society Registration Date"
            placeholder="Select Society Registration Date"
            {...register('societyRegistrationDate')}
            required
          />
          <DropDownList
            label="Is there any other college running by this committee which is affiliated with this University?"
            data={anotherCollegeOptions}
            textField="label"
            valueField="value"
            optionValue="value"
            defaultOptionText="Select Another College/Institute Run By this Society"
            {...register('isAnotherCollegeInstituteRunBySociety')}
            required
          />
        </FormGrid>
      </FormCard>
    </>
  );
}
