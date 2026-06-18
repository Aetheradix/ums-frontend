import SelectBlock from 'features/components/SelectBlock';
import SelectBloodGroup from 'features/components/SelectBloodGroup';
import SelectCaste from 'features/components/SelectCaste';
import SelectDegreeLevel from 'features/components/SelectDegreeLevel';
import SelectDesignation from 'features/components/SelectDesignation';
import SelectDistrict from 'features/components/SelectDistrict';
import SelectDivision from 'features/components/SelectDivision';
import SelectGender from 'features/components/SelectGender';
import SelectMaritalStatus from 'features/components/SelectMaritalStatus';
import SelectNationality from 'features/components/SelectNationality';
import SelectNatureOfEmployment from 'features/components/SelectNatureOfEmployment';
import SelectOrganizationUnit from 'features/components/SelectOrganizationUnit';
import SelectPost from 'features/components/SelectPost';
import SelectRelationshipTypes from 'features/components/SelectRelationshipTypes';
import SelectReligion from 'features/components/SelectReligion';
import SelectSalutation from 'features/components/SelectSalutation';
import SelectServiceCadre from 'features/components/SelectServiceCadre';
import SelectState from 'features/components/SelectState';
import SelectSubjectSpecialization from 'features/components/SelectSubjectSpecialization';
import SelectTehsil from 'features/components/SelectTehsil';
import SelectYesNo from 'features/components/SelectYesNo';

import {
  DatePicker,
  FormSubSection,
  FormWizard,
  NumberBox,
  Switch,
  TextArea,
  TextBox,
} from 'shared/components/forms';
import type { WizardStep } from 'shared/components/forms/FormWizard';
import { InputPanel } from 'shared/components/panels';
import { emptyQualification, useFullOnboardingForm } from './form.hook';

interface Props {
  onSubmit: Forms.SubmitFunc<EmployeeManagement.FullOnboardingForm>;
  isSaving: boolean;
}

export default function FullOnboardingForm(props: Props) {
  const { handleSubmit, reset, register, watch, trigger, setValue } =
    useFullOnboardingForm(props.onSubmit);

  const isSameAsCurrentAddress = watch('isSameAsCurrentAddress');
  const qualifications = watch('qualifications') || [];

  // When HR checks "Same as Current Address", immediately copy the current
  // address snapshot into the permanent address fields. We do this inside the
  // onChange handler rather than a useEffect so there is no async re-render
  // loop — it's a direct, intentional user action driving the data change.
  const handleSameAddressToggle = (checked: boolean) => {
    setValue('isSameAsCurrentAddress', checked);

    if (checked) {
      // Snapshot whatever the employee has entered so far for their current
      // address and copy it verbatim into the permanent address block.
      const snapshot = watch('currentAddress');
      setValue('permanentAddress', {
        ...snapshot,
        addressType: 'Permanent',
      });
    }
  };

  // Add a blank qualification row to the dynamic list
  const addQualification = () => {
    setValue('qualifications', [...qualifications, { ...emptyQualification }]);
  };

  // Remove a qualification row by index — at least one row must always remain
  const removeQualification = (index: number) => {
    if (qualifications.length <= 1) return;
    const updated = qualifications.filter((_, i) => i !== index);
    setValue('qualifications', updated);
  };

  const steps: WizardStep[] = [
    // ═══════════════════════════════
    //  STEP 1 – Employee (Quick Core)
    // ═══════════════════════════════
    {
      label: 'Employee (Core)',
      icon: 'user',
      content: (
        <InputPanel orientation="horizontal">
          <FormSubSection title="Personal Information" icon="id-card">
            <SelectSalutation
              {...register('salutation')}
              label="Salutation"
              required
            />

            <TextBox
              {...register('firstName')}
              label="First Name"
              placeholder="Enter first name"
              maxLength={50}
              required
            />

            <TextBox
              {...register('middleName')}
              label="Middle Name"
              placeholder="Enter middle name"
              maxLength={50}
            />

            <TextBox
              {...register('lastName')}
              label="Last Name"
              placeholder="Enter last name"
              maxLength={50}
              required
            />

            <SelectGender {...register('gender')} required />

            <SelectCaste
              {...register('appointedCategory')}
              label="Category"
              required
            />

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
              maxLength={100}
              required
            />

            <DatePicker
              {...register('dateOfBirth')}
              label="Date of Birth"
              placeholder="Select date of birth"
              required
            />
          </FormSubSection>

          <FormSubSection title="Employment Details" icon="briefcase">
            <SelectServiceCadre
              {...register('employeeType')}
              label="Employee Type"
              required
            />

            <SelectNatureOfEmployment
              {...register('employeeNatureId')}
              label="Nature of Employment"
              required
            />

            <SelectOrganizationUnit
              {...register('organizationUnitId')}
              label="Organization Unit"
              required
            />

            <SelectPost {...register('postId')} required />

            <SelectDesignation {...register('designationId')} required />

            <SelectSubjectSpecialization
              {...register('subjectSpecializationId')}
              label="Subject Specialization"
              required
            />

            <TextBox
              {...register('seniorityRank')}
              label="Seniority Rank"
              placeholder="Enter seniority rank"
              maxLength={20}
            />

            <TextBox
              {...register('employeeCode')}
              label="Employee Code"
              placeholder="Enter employee code"
              maxLength={50}
              required
            />

            <DatePicker
              {...register('dateOfJoining')}
              label="Date of Joining"
              placeholder="Select date of joining"
              required
            />
          </FormSubSection>
        </InputPanel>
      ),
    },

    // ═══════════════════════════════
    //  STEP 2 – Extended Details
    // ═══════════════════════════════
    {
      label: 'Extended Details',
      icon: 'id-card',
      content: (
        <InputPanel orientation="horizontal">
          <FormSubSection title="Personal & Family" icon="users">
            <SelectBloodGroup {...register('bloodGroup')} label="Blood Group" />

            <SelectMaritalStatus
              {...register('maritalStatus')}
              label="Marital Status"
            />

            <SelectNationality
              {...register('nationalityId')}
              label="Nationality"
              required
            />

            <SelectReligion
              {...register('religionId')}
              label="Religion"
              required
            />

            <SelectYesNo
              {...register('isPersonWithDisability')}
              label="Person with Disability (PwBD)"
              useBooleanValues
              required
            />

            <TextBox
              {...register('fatherName')}
              label="Father's Name"
              placeholder="Enter father's name"
              maxLength={150}
            />

            <TextBox
              {...register('motherName')}
              label="Mother's Name"
              placeholder="Enter mother's name"
              maxLength={150}
            />
          </FormSubSection>

          <FormSubSection title="Contact Details" icon="phone">
            <TextBox
              {...register('personalEmail')}
              label="Personal Email"
              placeholder="Enter personal email"
              maxLength={50}
            />

            <TextBox
              {...register('alternateMobileNumber')}
              label="Alternate Mobile"
              placeholder="Enter alternate mobile"
              maxLength={100}
            />

            <TextBox
              {...register('officePhoneNumber')}
              label="Office Phone"
              placeholder="Enter office phone"
              maxLength={100}
            />

            <TextBox
              {...register('personalWebsite')}
              label="Personal Website"
              placeholder="Enter website URL"
              maxLength={255}
            />

            <TextArea
              {...register('bioNote')}
              label="Bio Note"
              placeholder="Enter bio note"
              rows={3}
            />
          </FormSubSection>

          <FormSubSection title="Emergency Contact" icon="exclamation-triangle">
            <TextBox
              {...register('emergencyContactName')}
              label="Emergency Contact Name"
              placeholder="Enter emergency contact name"
              maxLength={100}
              required
            />

            <SelectRelationshipTypes
              {...register('emergencyRelation')}
              label="Emergency Relation"
              required
            />

            <TextBox
              {...register('emergencyPhoneNumber')}
              label="Emergency Mobile"
              placeholder="Enter emergency phone"
              maxLength={100}
              required
            />
          </FormSubSection>

          <FormSubSection title="Statutory Documents" icon="file">
            <TextBox
              {...register('aadharNumber')}
              label="Aadhaar Number"
              placeholder="Enter 12-digit Aadhaar"
              maxLength={12}
              required
            />

            <TextBox
              {...register('panNumber')}
              label="PAN Number"
              placeholder="Enter PAN"
              maxLength={10}
            />

            <TextBox
              {...register('uanNumber')}
              label="UAN / PF Number"
              placeholder="Enter UAN"
              maxLength={100}
            />

            <TextBox
              {...register('drivingLicense')}
              label="Driving License"
              placeholder="Enter driving license"
              maxLength={100}
            />

            <TextBox
              {...register('passportNumber')}
              label="Passport Number"
              placeholder="Enter passport number"
              maxLength={100}
            />

            <DatePicker
              {...register('passportValidity')}
              label="Passport Validity"
              placeholder="Select passport validity"
            />
          </FormSubSection>
        </InputPanel>
      ),
    },

    // ═══════════════════════════════
    //  STEP 3 – Address Details
    // ═══════════════════════════════
    {
      label: 'Address Details',
      icon: 'map-marker',
      content: (
        <InputPanel orientation="horizontal">
          <FormSubSection title="Current Address" icon="home">
            <TextBox
              {...register('currentAddress.addressLine1')}
              label="Address Line 1"
              placeholder="Enter address line 1"
              maxLength={255}
              required
            />

            <TextBox
              {...register('currentAddress.addressLine2')}
              label="Address Line 2"
              placeholder="Enter address line 2"
              maxLength={255}
            />

            <TextBox
              {...register('currentAddress.city')}
              label="City"
              placeholder="Enter city"
              maxLength={100}
              required
            />

            <SelectState
              {...register('currentAddress.stateId')}
              label="State"
              required
            />

            <SelectDivision
              {...register('currentAddress.divisionId')}
              label="Division"
            />

            <SelectDistrict
              {...register('currentAddress.districtId')}
              label="District"
              required
            />

            <SelectTehsil
              {...register('currentAddress.tehsilId')}
              label="Tehsil"
            />

            <SelectBlock
              {...register('currentAddress.blockId')}
              label="Block"
            />

            <TextBox
              {...register('currentAddress.pinCode')}
              label="PIN Code"
              placeholder="Enter PIN code"
              maxLength={10}
              required
            />
          </FormSubSection>

          <FormSubSection title="Permanent Address" icon="map">
            {/* The toggle drives handleSameAddressToggle which copies the
                current address directly — no effects, no hidden subscriptions */}
            <div className="col-span-full">
              <Switch
                {...register('isSameAsCurrentAddress')}
                label="Same as Current Address"
                onChange={handleSameAddressToggle}
              />
            </div>

            {!isSameAsCurrentAddress && (
              <>
                <TextBox
                  {...register('permanentAddress.addressLine1')}
                  label="Address Line 1"
                  placeholder="Enter address line 1"
                  maxLength={255}
                  required
                />

                <TextBox
                  {...register('permanentAddress.addressLine2')}
                  label="Address Line 2"
                  placeholder="Enter address line 2"
                  maxLength={255}
                />

                <TextBox
                  {...register('permanentAddress.city')}
                  label="City"
                  placeholder="Enter city"
                  maxLength={100}
                  required
                />

                <SelectState
                  {...register('permanentAddress.stateId')}
                  label="State"
                  required
                />

                <SelectDivision
                  {...register('permanentAddress.divisionId')}
                  label="Division"
                />

                <SelectDistrict
                  {...register('permanentAddress.districtId')}
                  label="District"
                  required
                />

                <SelectTehsil
                  {...register('permanentAddress.tehsilId')}
                  label="Tehsil"
                />

                <SelectBlock
                  {...register('permanentAddress.blockId')}
                  label="Block"
                />

                <TextBox
                  {...register('permanentAddress.pinCode')}
                  label="PIN Code"
                  placeholder="Enter PIN code"
                  maxLength={10}
                  required
                />
              </>
            )}
          </FormSubSection>
        </InputPanel>
      ),
    },

    // ═══════════════════════════════
    //  STEP 4 – Qualifications
    // ═══════════════════════════════
    {
      label: 'Qualifications',
      icon: 'book',
      content: (
        <InputPanel orientation="horizontal">
          <FormSubSection title="Highest Qualification" icon="star">
            <SelectDegreeLevel
              {...register('qualificationLevelId')}
              label="Highest Qualification"
              required
            />
          </FormSubSection>

          {/* Each row maps to one Employee.Qualification record in the DB.
              register() already carries { control, name } internally so we
              just spread it — no need to pass control explicitly. */}
          {qualifications.map((_, index) => (
            <FormSubSection
              key={index}
              title={`Qualification ${index + 1}`}
              icon="graduation-cap"
            >
              <SelectDegreeLevel
                {...register(`qualifications.${index}.qualificationId`)}
                label="Qualification Name"
                required
              />

              <TextBox
                {...register(`qualifications.${index}.university`)}
                label="University"
                placeholder="Enter university"
                maxLength={200}
                required
              />

              <TextBox
                {...register(`qualifications.${index}.board`)}
                label="Board"
                placeholder="Enter board"
                maxLength={200}
              />

              <NumberBox
                {...register(`qualifications.${index}.yearOfPassing`)}
                label="Year of Passing"
                min={1950}
                max={new Date().getFullYear()}
                required
              />

              {/* Either percentage or grade is required — both are optional
                  individually; the backend validates at least one is present */}
              <NumberBox
                {...register(`qualifications.${index}.percentage`)}
                label="Percentage"
                min={0}
                max={100}
              />

              <TextBox
                {...register(`qualifications.${index}.grade`)}
                label="Grade"
                placeholder="Enter grade (e.g. A+)"
                maxLength={10}
              />

              {qualifications.length > 1 && (
                <div className="col-span-full flex justify-end">
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                    onClick={() => removeQualification(index)}
                  >
                    <i className="pi pi-trash text-xs" />
                    Remove
                  </button>
                </div>
              )}
            </FormSubSection>
          ))}

          <div className="w-full flex justify-start mt-2 mb-4">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1"
              onClick={addQualification}
            >
              <i className="pi pi-plus text-xs" />
              Add Another Qualification
            </button>
          </div>
        </InputPanel>
      ),
    },
  ];

  return (
    <FormWizard
      steps={steps}
      onComplete={handleSubmit as () => void}
      isSaving={props.isSaving}
      triggerValidation={trigger as (fields: string[]) => Promise<boolean>}
      onReset={reset}
    />
  );
}
