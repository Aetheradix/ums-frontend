import { useEffect } from 'react';
import { COLLEGE_TYPES } from 'shared/constant';
import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<EmployeeManagement.QuickOnboardingForm>(o => ({
  // Employee Information
  employeeType: o.string().required().max(50).label('Employee Type'),

  employeeNatureId: o.number().required().min(1).label('Nature of Employment'),

  postId: o.number().required().min(1).label('Post'),

  designationId: o.number().required().min(1).label('Designation'),

  seniorityRank: o.string().required().max(20).label('Seniority Rank'),

  subjectSpecializationId: o
    .number()
    .required()
    .min(1)
    .label('Subject Specialization'),

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

  // Personal Information
  salutation: o.string().required().max(15).label('Salutation'),

  firstName: o.string().required().max(50).label('First Name'),

  middleName: o
    .string()
    .allow('', null)
    .optional()
    .max(50)
    .label('Middle Name'),

  lastName: o.string().required().max(50).label('Last Name'),

  gender: o.string().required().label('Gender'),

  casteId: o.number().required().min(1).label('Category'),

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

  // Employee Code
  employeeCode: o.string().required().max(50).label('Employee Code'),
}));

export function useQuickOnboardingForm(
  submitCallback: Forms.SubmitFunc<EmployeeManagement.QuickOnboardingForm>,
  fetchData?: Forms.FetchDataFunc<EmployeeManagement.QuickOnboardingForm>
) {
  const { register, handleSubmit, reset, setValue, watch } =
    useAppForm<EmployeeManagement.QuickOnboardingForm>({
      defaultValues: fetchData,

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
  };
}
