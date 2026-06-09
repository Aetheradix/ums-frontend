import SelectDesignation from 'features/components/SelectDesignation';
import SelectGender from 'features/components/SelectGender';
import SelectNatureOfEmployment from 'features/components/SelectNatureOfEmployment';
import SelectOrganizationUnit from 'features/components/SelectOrganizationUnit';
import SelectPost from 'features/components/SelectPost';
import SelectSalutation from 'features/components/SelectSalutation';
import SelectServiceCadre from 'features/components/SelectServiceCadre';
import SelectSubjectSpecialization from 'features/components/SelectSubjectSpecialization';
import { Button } from 'shared/components/buttons';
import { DatePicker, RadioButtonList, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import { useQuickOnboardingForm } from './form.hook';

interface QuickOnboardingFormProps {
  onSubmit: Forms.SubmitFunc<EmployeeManagement.QuickOnboardingForm>;
  onCancel: VoidFunction;
  isSaving?: boolean;
  initialData?: EmployeeManagement.QuickOnboardingForm;
  isReadOnly?: boolean;
}

export default function QuickOnboardingForm({
  onSubmit,
  onCancel,
  isSaving = false,
  initialData,
  isReadOnly = false,
}: QuickOnboardingFormProps) {
  const { control, handleSubmit, watch, reset } = useQuickOnboardingForm(
    onSubmit,
    initialData
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <fieldset
        disabled={isReadOnly}
        className="flex flex-col gap-6 border-none p-0 m-0 min-w-0"
      >
        <FormCard title="Employee Personal Information" icon="user">
          <FormGrid columns={3}>
            <SelectSalutation
              name="salutation"
              label="Salutation"
              control={control}
              required
            />

            <TextBox
              control={control}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              required
            />

            <TextBox
              control={control}
              name="middleName"
              label="Middle Name"
              placeholder="Enter middle name"
            />

            <TextBox
              control={control}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              required
            />

            <SelectGender name="gender" control={control} required />

            <TextBox
              control={control}
              name="appointedCategory"
              label="Appointed Category"
              placeholder="Enter appointed category"
            />

            <TextBox
              control={control}
              name="mobileNumber"
              label="Mobile Number"
              placeholder="Enter mobile number"
              maxLength={10}
              required
            />

            <TextBox
              control={control}
              name="officialEmail"
              label="Official Email"
              placeholder="Enter official email"
              required
            />
            <DatePicker
              control={control}
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="Select date of birth"
              required
            />
          </FormGrid>
        </FormCard>
        <FormCard title="Employee Information" icon="briefcase">
          <FormGrid columns={3}>
            <SelectServiceCadre
              name="employeeType"
              label="Employee Type"
              control={control}
              required
            />

            <SelectNatureOfEmployment
              name="employeeNatureId"
              label="Nature of Employment"
              control={control}
              required
            />

            <SelectOrganizationUnit
              name="organizationUnitId"
              label="Organization Unit"
              control={control}
              required
            />

            <SelectPost name="postId" control={control} required />

            <SelectDesignation
              name="designationId"
              control={control}
              required
            />

            <TextBox
              control={control}
              name="seniorityRank"
              label="Seniority Rank"
              placeholder="Enter seniority rank"
            />

            <SelectSubjectSpecialization
              name="subjectSpecializationId"
              label="Subject Specialization"
              control={control}
              required
            />

            <div className="col-span-3">
              <RadioButtonList
                control={control}
                name="employeeCodeSelection"
                label="Employee Code Selection"
                required
                variant="horizontal"
                optionLayout="horizontal"
                options={[
                  {
                    label: 'Auto Generate',
                    value: 'AutoGenerate',
                  },
                  {
                    label: 'Enter Existing Employee Code',
                    value: 'Manual',
                  },
                ]}
              />
            </div>

            {watch('employeeCodeSelection') === 'Manual' && (
              <TextBox
                control={control}
                name="employeeCode"
                label="Existing Employee Code"
                placeholder="Enter existing employee code"
                required
              />
            )}
          </FormGrid>
        </FormCard>
      </fieldset>

      <div className="form-actions-container form-actions-right">
        <Button
          label={isReadOnly ? 'Back' : 'Cancel'}
          type="button"
          onClick={onCancel}
          icon={isReadOnly ? 'arrow-left' : 'times'}
          variant="outlined"
          disabled={isSaving}
        />

        {!isReadOnly && (
          <>
            <Button
              label="Reset"
              type="button"
              onClick={() => reset()}
              icon="refresh"
              variant="outlined"
              disabled={isSaving}
            />

            <Button
              label="Register Employee"
              type="submit"
              icon="check"
              variant="success"
              isLoading={isSaving}
            />
          </>
        )}
      </div>
    </form>
  );
}
