import { DatePicker, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import SelectEmployeeType from 'features/components/SelectEmployeeType';
import SelectNatureOfEmployment from 'features/components/SelectNatureOfEmployment';
import SelectOrganizationUnit from 'features/components/SelectOrganizationUnit';
import SelectPost from 'features/components/SelectPost';
import SelectSubjectSpecialization from 'features/components/SelectSubjectSpecialization';

interface ServiceInfoStepProps {
  register: any;
}

export default function ServiceInfoStep({ register }: ServiceInfoStepProps) {
  return (
    <FormCard title="Service Information" icon="briefcase">
      <FormGrid columns={3}>
        <TextBox
          label="Employee Code"
          placeholder="Auto-generated if left blank"
          {...register('employeeCode')}
          maxLength={50}
        />
        <SelectEmployeeType {...register('employeeType')} required />
        <SelectNatureOfEmployment {...register('employeeNatureId')} required />
        <SelectOrganizationUnit {...register('organizationUnitId')} required />
        <SelectPost {...register('postId')} required />
        <SelectSubjectSpecialization
          {...register('subjectSpecializationId')}
          required
        />
        <DatePicker
          label="Date of Joining"
          placeholder="Select Date of Joining"
          {...register('dateOfJoining')}
          required
        />
        <TextBox
          label="Seniority Rank"
          placeholder="Enter Seniority Rank"
          {...register('seniorityRank')}
          maxLength={20}
        />
      </FormGrid>
    </FormCard>
  );
}
