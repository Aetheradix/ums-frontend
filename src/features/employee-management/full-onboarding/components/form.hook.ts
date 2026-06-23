import { useEffect } from 'react';
import { COLLEGE_TYPES } from 'shared/constant';
import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<EmployeeManagement.FullOnboardingForm>(o => {
  const addressSchema = o.object({
    addressType: o.string().allow('', null).optional(),
    addressLine1: o.string().required().max(255).label('Address Line 1'),
    addressLine2: o.string().allow('', null).max(255).label('Address Line 2'),
    city: o.string().required().max(100).label('City'),
    stateId: o
      .number()
      .required()
      .min(1)
      .label('State')
      .messages({ 'number.min': 'Required', 'number.base': 'Required' }),
    divisionId: o
      .number()
      .required()
      .min(1)
      .label('Division')
      .messages({ 'number.min': 'Required', 'number.base': 'Required' }),
    districtId: o
      .number()
      .required()
      .min(1)
      .label('District')
      .messages({ 'number.min': 'Required', 'number.base': 'Required' }),
    tehsilId: o
      .number()
      .required()
      .min(1)
      .label('Tehsil')
      .messages({ 'number.min': 'Required', 'number.base': 'Required' }),
    blockId: o
      .number()
      .required()
      .min(1)
      .label('Block')
      .messages({ 'number.min': 'Required', 'number.base': 'Required' }),
    pinCode: o.string().required().max(10).label('PIN Code'),
  });

  const qualificationSchema = o.object({
    qualificationId: o
      .number()
      .required()
      .min(1)
      .label('Qualification Name')
      .messages({
        'number.min': 'Required',
        'number.base': 'Required',
      }),
    university: o.string().required().max(200).label('University'),
    board: o.string().allow('', null).max(200).label('Board'),
    yearOfPassing: o
      .number()
      .required()
      .min(1950)
      .max(new Date().getFullYear())
      .label('Year of Passing')
      .messages({
        'number.base': 'Required',
      }),
    percentage: o.number().allow('', null).label('Percentage'),
    grade: o.string().allow('', null).max(10).label('Grade'),
  });

  return {
    // ── Step 1: Quick Core ──
    salutation: o.string().required().max(15).label('Salutation'),
    firstName: o.string().required().max(50).label('First Name'),
    middleName: o.string().allow('').max(50).label('Middle Name'),
    lastName: o.string().required().max(50).label('Last Name'),
    gender: o.string().required().label('Gender'),
    casteId: o.number().required().min(1).label('Caste'),
    mobileNumber: o
      .string()
      .required()
      .length(10)
      .pattern(/^\d{10}$/)
      .label('Mobile Number'),
    officialEmail: o
      .string()
      .required()
      .max(100)
      .email({ tlds: false })
      .label('Official Email'),
    dateOfBirth: o.date().required().label('Date of Birth'),
    employeeType: o.string().required().max(50).label('Employee Type'),
    employeeNatureId: o
      .number()
      .required()
      .min(1)
      .label('Nature of Employment'),
    postId: o.number().required().min(1).label('Post'),
    designationId: o.number().required().min(1).label('Designation'),
    subjectSpecializationId: o
      .number()
      .required()
      .min(1)
      .label('Subject Specialization'),
    seniorityRank: o.string().required().max(20).label('Seniority Rank'),
    employeeCode: o.string().required().max(50).label('Employee Code'),
    dateOfJoining: o.date().required().label('Date of Joining'),

    collegeTypeId: o.number().optional().min(1).label('College Type'),
    registrationId: o
      .number()
      .label('College Name')
      .when('collegeTypeId', {
        is: o
          .number()
          .valid(
            COLLEGE_TYPES.AFFILIATED_COLLEGE,
            COLLEGE_TYPES.AUTONOMOUS_COLLEGE
          ),
        then: o.number().required().min(1),
        otherwise: o.number().optional().allow(null),
      }),
    parentUniversityName: o
      .string()
      .label('Parent University Name')
      .when('collegeTypeId', {
        is: o
          .number()
          .valid(
            COLLEGE_TYPES.UNIVERSITY_ADMINISTRATION,
            COLLEGE_TYPES.MAIN_CAMPUS_UTDS
          ),
        then: o.string().required(),
        otherwise: o.string().optional().allow('', null),
      }),

    departmentGroupTypeId: o
      .number()
      .optional()
      .min(1)
      .label('Department Group Type'),
    departmentGroupId: o.number().optional().min(1).label('Department Group'),
    departmentId: o.number().optional().min(1).label('Department'),

    // ── Step 2: Extended ──
    bloodGroup: o.string().required().max(5).label('Blood Group'),
    maritalStatus: o.string().required().max(30).label('Marital Status'),
    nationalityId: o.number().required().min(1).label('Nationality'),
    religionId: o.number().required().min(1).label('Religion'),
    isPersonWithDisability: o.boolean().required().label('PwBD Status'),
    fatherName: o.string().required().max(150).label("Father's Name"),
    motherName: o.string().required().max(150).label("Mother's Name"),
    personalEmail: o
      .string()
      .required()
      .max(50)
      .email({ tlds: false })
      .label('Personal Email'),
    alternateMobileNumber: o
      .string()
      .required()
      .length(10)
      .pattern(/^\d{10}$/)
      .label('Alternate Mobile'),
    officePhoneNumber: o.string().allow('').max(15).label('Office Phone'),
    emergencyContactName: o
      .string()
      .required()
      .max(100)
      .label('Emergency Contact Name'),
    emergencyRelation: o
      .string()
      .required()
      .max(50)
      .label('Emergency Relation'),
    emergencyPhoneNumber: o
      .string()
      .required()
      .length(10)
      .pattern(/^\d{10}$/)
      .label('Emergency Mobile'),
    personalWebsite: o.string().allow('').max(255).label('Personal Website'),
    bioNote: o.string().allow('').max(600).label('Bio Note'),
    aadharNumber: o.string().required().length(12).label('Aadhaar Number'),
    panNumber: o.string().allow('').max(10).label('PAN Number'),
    uanNumber: o.string().allow('').max(12).label('UAN Number'),
    drivingLicense: o.string().allow('').max(20).label('Driving License'),
    passportNumber: o.string().allow('').max(100).label('Passport Number'),
    passportValidity: o
      .date()
      .allow(null)
      .optional()
      .label('Passport Validity'),

    // ── Step 3: Address ──
    currentAddress: addressSchema.required(),
    permanentAddress: o.any().when('isSameAsCurrentAddress', {
      is: true,
      then: o.any().optional(),
      otherwise: addressSchema.required(),
    }),
    isSameAsCurrentAddress: o.boolean().optional(),

    // ── Step 4: Qualifications ──
    qualificationLevelId: o
      .number()
      .required()
      .min(1)
      .label('Highest Qualification'),
    qualifications: o
      .array()
      .items(qualificationSchema)
      .min(1)
      .required()
      .label('Qualifications'),
  };
});

const emptyQualification: EmployeeManagement.QualificationForm = {
  qualificationId: 0,
  university: '',
  board: '',
  yearOfPassing: 0,
  percentage: 0,
  grade: '',
};

export function useFullOnboardingForm(
  submitCallback: Forms.SubmitFunc<EmployeeManagement.FullOnboardingForm>,
  fetchData?: Forms.FetchDataFunc<EmployeeManagement.FullOnboardingForm>
) {
  const { register, handleSubmit, reset, setValue, watch, trigger } =
    useAppForm<EmployeeManagement.FullOnboardingForm>({
      defaultValues: fetchData || {
        isPersonWithDisability: false,
        isSameAsCurrentAddress: false,
        currentAddress: {
          addressType: 'Current',
        } as EmployeeManagement.AddressForm,
        permanentAddress: {
          addressType: 'Permanent',
        } as EmployeeManagement.AddressForm,
        qualifications: [{ ...emptyQualification }],
      },

      resolver: validation.resolver(schema),
    });

  const collegeTypeId = watch('collegeTypeId');

  useEffect(() => {
    if (
      collegeTypeId === COLLEGE_TYPES.UNIVERSITY_ADMINISTRATION ||
      collegeTypeId === COLLEGE_TYPES.MAIN_CAMPUS_UTDS
    ) {
      setValue('registrationId', undefined, { shouldValidate: true });
      setValue('parentUniversityName', 'DAVV', {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else if (
      collegeTypeId === COLLEGE_TYPES.AFFILIATED_COLLEGE ||
      collegeTypeId === COLLEGE_TYPES.AUTONOMOUS_COLLEGE
    ) {
      setValue('parentUniversityName', null, { shouldValidate: true });
      setValue('registrationId', undefined, { shouldValidate: true });
    } else {
      setValue('parentUniversityName', null, { shouldValidate: true });
      setValue('registrationId', undefined, { shouldValidate: true });
    }
  }, [collegeTypeId, setValue]);

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
    setValue,
    watch,
    trigger,
  };
}

export { emptyQualification };
