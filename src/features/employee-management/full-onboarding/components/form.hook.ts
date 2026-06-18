import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<EmployeeManagement.FullOnboardingForm>(o => ({
  // Section A
  salutation: o.string().required(),
  firstName: o.string().required().max(50),
  middleName: o.string().allow('', null).optional().max(50),
  lastName: o.string().required().max(50),
  gender: o.any().required(),
  dateOfBirth: o.date().required(),
  appointedCategory: o.any().required(),
  mobileNumber: o
    .string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      'string.pattern.base': 'Mobile number must be exactly 10 digits',
    }),
  officialEmail: o.string().email({ tlds: false }).required(),
  panNumber: o.string().allow('', null).optional(),
  bloodGroup: o.any().allow('', null).optional(),
  maritalStatus: o.any().allow('', null).optional(),

  // Section B
  employeeCode: o.string().allow('', null).optional(),
  employeeType: o.any().required(),
  employeeNatureId: o.any().required(),
  organizationUnitId: o.any().required(),
  postId: o.any().required(),
  subjectSpecializationId: o.any().required(),
  dateOfJoining: o.date().required(),
  seniorityRank: o.string().allow('', null).optional(),

  // Additional DB Fields
  nationalityId: o.any().allow('', null).optional(),
  religionId: o.any().allow('', null).optional(),
  casteId: o.any().allow('', null).optional(),
  fatherName: o.string().allow('', null).optional(),
  motherName: o.string().allow('', null).optional(),
  personalEmail: o.string().email({ tlds: false }).allow('', null).optional(),
  alternateMobileNumber: o.string().allow('', null).optional(),
  officePhoneNumber: o.string().allow('', null).optional(),
  emergencyPhoneNumber: o.string().allow('', null).optional(),
  personalWebsite: o.string().allow('', null).optional(),
  bioNote: o.string().allow('', null).optional(),
  dateOfSuperannuation: o.date().allow('', null).optional(),
  isPwbd: o.boolean().optional(),
  drivingLicense: o.string().allow('', null).optional(),
  passportNumber: o.string().allow('', null).optional(),
  passportValidity: o.date().allow('', null).optional(),
  uanNumber: o.string().allow('', null).optional(),

  // Section C
  qualifications: o.array().items(
    o.object({
      qualificationId: o.any().required(),
      university: o.string().allow('', null).optional(),
      board: o.string().allow('', null).optional(),
      yearOfPassing: o.number().allow('', null).optional(),
      percentage: o.number().allow('', null).optional(),
      grade: o.string().allow('', null).optional(),
    })
  ),

  // Section D
  addresses: o.array().items(
    o.object({
      addressType: o.any().required(),
      addressLine1: o.string().required(),
      addressLine2: o.string().allow('', null).optional(),
      city: o.string().required(),
      stateId: o.any().allow('', null).optional(),
      districtId: o.any().allow('', null).optional(),
      divisionId: o.any().allow('', null).optional(),
      tehsilId: o.any().allow('', null).optional(),
      blockId: o.any().allow('', null).optional(),
      pinCode: o.string().allow('', null).optional(),
    })
  ),
}));

export function useFullOnboardingForm() {
  return useAppForm<EmployeeManagement.FullOnboardingForm>({
    resolver: validation.resolver(schema),
    defaultValues: {
      qualifications: [],
      addresses: [
        { addressType: 'Permanent', addressLine1: '', city: '' },
        { addressType: 'Current', addressLine1: '', city: '' },
      ],
      isPwbd: false,
    },
  });
}
