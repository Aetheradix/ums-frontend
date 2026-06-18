import { DatePicker, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import SelectSalutation from 'features/components/SelectSalutation';
import SelectGender from 'features/components/SelectGender';
import SelectBloodGroup from 'features/components/SelectBloodGroup';
import SelectMaritalStatus from 'features/components/SelectMaritalStatus';
import SelectCaste from 'features/components/SelectCaste';

interface PersonalInfoStepProps {
  register: any;
}

export default function PersonalInfoStep({ register }: PersonalInfoStepProps) {
  return (
    <FormCard title="Personal Information" icon="user">
      <FormGrid columns={3}>
        <SelectSalutation {...register('salutation')} required />
        <TextBox
          label="First Name"
          placeholder="Enter First Name"
          {...register('firstName')}
          maxLength={50}
          required
        />
        <TextBox
          label="Middle Name"
          placeholder="Enter Middle Name"
          {...register('middleName')}
          maxLength={50}
        />
        <TextBox
          label="Last Name"
          placeholder="Enter Last Name"
          {...register('lastName')}
          maxLength={50}
          required
        />
        <SelectGender {...register('gender')} required />
        <DatePicker
          label="Date of Birth"
          placeholder="Select Date of Birth"
          {...register('dateOfBirth')}
          required
        />
        <SelectCaste {...register('appointedCategory')} required />
        <TextBox
          label="Mobile Number"
          placeholder="Enter Mobile Number"
          {...register('mobileNumber')}
          maxLength={10}
          required
        />
        <TextBox
          label="Official Email"
          placeholder="Enter Official Email"
          {...register('officialEmail')}
          maxLength={100}
          required
        />
        <TextBox
          label="PAN Number"
          placeholder="Enter PAN Number"
          {...register('panNumber')}
          maxLength={10}
        />
        <SelectBloodGroup {...register('bloodGroup')} />
        <SelectMaritalStatus {...register('maritalStatus')} />
      </FormGrid>
    </FormCard>
  );
}
