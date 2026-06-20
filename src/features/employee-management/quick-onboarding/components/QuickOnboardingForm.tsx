import SelectCaste from 'features/components/SelectCaste';
import SelectCollegeName from 'features/components/SelectCollegeName';
import SelectCollegeType from 'features/components/SelectCollegeType';
import SelectDepartmentByGroup from 'features/components/SelectDepartmentByGroup';
import SelectDepartmentGroupByGroupType from 'features/components/SelectDepartmentGroupByGroupType';
import SelectDepartmentGroupType from 'features/components/SelectDepartmentGroupType';
import SelectDesignationByEmployeeType from 'features/components/SelectDesignationByEmployeeType';
import SelectEmployeeType from 'features/components/SelectEmployeeType';
import SelectGender from 'features/components/SelectGender';
import SelectNatureOfEmployment from 'features/components/SelectNatureOfEmployment';
import SelectPost from 'features/components/SelectPost';
import SelectSalutation from 'features/components/SelectSalutation';
import SelectSubjectSpecialization from 'features/components/SelectSubjectSpecialization';
import { Button } from 'shared/components/buttons';
import { DatePicker, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import { useQuickOnboardingForm } from './form.hook';

interface Props {
  onSubmit: Forms.SubmitFunc<EmployeeManagement.QuickOnboardingForm>;
  onCancel: VoidFunction;
  isSaving?: boolean;
  initialData?: EmployeeManagement.QuickOnboardingForm;
  isReadOnly?: boolean;
}

export default function QuickOnboardingForm(props: Props) {
  const { register, handleSubmit, reset, watch, control } =
    useQuickOnboardingForm(props.onSubmit, props.initialData);

  const employeeType = watch('employeeType');
  const collegeTypeId = watch('collegeTypeId');
  const departmentGroupTypeId = watch('departmentGroupTypeId');
  const departmentGroupId = watch('departmentGroupId');

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <fieldset
        disabled={props.isReadOnly}
        className="flex flex-col gap-6 border-none p-0 m-0 min-w-0"
      >
        <FormCard title="Employee Personal Information" icon="user">
          <FormGrid columns={3}>
            <SelectSalutation
              {...register('salutation')}
              label="Salutation"
              required
            />

            <TextBox
              {...register('firstName')}
              label="First Name"
              placeholder="Enter first name"
              required
            />

            <TextBox
              {...register('middleName')}
              label="Middle Name"
              placeholder="Enter middle name"
            />

            <TextBox
              {...register('lastName')}
              label="Last Name"
              placeholder="Enter last name"
              required
            />

            <SelectGender {...register('gender')} required />

            <SelectCaste {...register('casteId')} label="Category" required />

            <TextBox
              {...register('mobileNumber')}
              label="Mobile Number"
              placeholder="Enter mobile number"
              maxLength={10}
              required
            />

            <TextBox
              {...register('officialEmail')}
              label="Official Email"
              placeholder="Enter official email"
              required
            />

            <DatePicker
              {...register('dateOfBirth')}
              label="Date of Birth"
              placeholder="Select date of birth"
              required
            />
          </FormGrid>
        </FormCard>

        <FormCard title="Placement / Posting Information" icon="building">
          <FormGrid columns={3}>
            <SelectCollegeType
              name="collegeTypeId"
              control={control}
              label="College Type"
              defaultOptionText="Select College Type"
            />

            {(collegeTypeId === 17 || collegeTypeId === 18) && (
              <SelectCollegeName
                name="registrationId"
                control={control}
                collegeTypeId={collegeTypeId}
                label="College Name"
                defaultOptionText="Select College Name"
              />
            )}

            {(collegeTypeId === 15 || collegeTypeId === 16) && (
              <TextBox
                name="parentUniversityName"
                control={control}
                label="Parent University Name"
              />
            )}

            <SelectDepartmentGroupType
              name="departmentGroupTypeId"
              control={control}
              label="Department Group Type"
              defaultOptionText="Select Department Group Type"
            />

            <SelectDepartmentGroupByGroupType
              name="departmentGroupId"
              control={control}
              departmentGroupTypeId={departmentGroupTypeId}
              label="Department Group"
              defaultOptionText="Select Department Group"
            />

            <SelectDepartmentByGroup
              name="departmentId"
              control={control}
              departmentGroupId={departmentGroupId}
              label="Department"
              defaultOptionText="Select Department"
            />
          </FormGrid>
        </FormCard>

        <FormCard title="Employee Information" icon="briefcase">
          <FormGrid columns={3}>
            <SelectEmployeeType
              {...register('employeeType')}
              label="Employee Type"
              required
            />

            <SelectNatureOfEmployment
              {...register('employeeNatureId')}
              label="Nature of Employment"
              required
            />

            <SelectPost {...register('postId')} required />

            <SelectDesignationByEmployeeType
              name="designationId"
              control={control}
              employeeType={employeeType}
              label="Designation"
              defaultOptionText="Select Designation"
            />

            <TextBox
              {...register('seniorityRank')}
              label="Seniority Rank"
              placeholder="Enter seniority rank"
            />

            <SelectSubjectSpecialization
              {...register('subjectSpecializationId')}
              label="Subject Specialization"
              required
            />

            <TextBox
              {...register('employeeCode')}
              label="Employee Code"
              placeholder="Enter Employee code"
              required
            />
          </FormGrid>
        </FormCard>
      </fieldset>

      <div className="form-actions-container form-actions-right">
        <Button
          label={props.isReadOnly ? 'Back' : 'Cancel'}
          type="button"
          onClick={props.onCancel}
          icon={props.isReadOnly ? 'arrow-left' : 'times'}
          variant="outlined"
          disabled={props.isSaving}
        />

        {!props.isReadOnly && (
          <>
            <Button
              label="Reset"
              type="button"
              onClick={() => reset()}
              icon="refresh"
              variant="outlined"
              disabled={props.isSaving}
            />

            <Button
              label="Register Employee"
              type="submit"
              icon="check"
              variant="success"
              isLoading={props.isSaving}
            />
          </>
        )}
      </div>
    </form>
  );
}
