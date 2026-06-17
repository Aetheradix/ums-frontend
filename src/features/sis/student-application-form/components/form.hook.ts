import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';
import type { ApplicationFormData } from '../types';

const schema = validation.create<ApplicationFormData>(o => ({
  // Top-level
  academicSession: o.any().required(),
  programme: o.any().required(),

  // Basic Info
  firstName: o.string().required().max(45),
  middleName: o.string().allow('', null).optional().max(45),
  lastName: o.string().required().max(45),
  email: o.string().required().email({ tlds: false }).max(30),
  phone: o
    .string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
    }),
  gender: o.any().required(),
  caste: o.any().required(),
  dateOfBirth: o.date().required(),
  age: o.number().required().min(1).max(120),
  fatherName: o.string().required().max(45),
  fatherOccupation: o.any().required(),
  fatherDesignation: o.any().required(),
  fatherAnnualIncome: o.number().required().min(0),
  fatherContactNumber: o
    .string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      'string.pattern.base': 'Father contact number must be 10 digits',
    }),
  motherName: o.string().required().max(45),
  motherOccupation: o.any().required(),
  motherDesignation: o.any().required(),
  motherAnnualIncome: o.number().required().min(0),
  motherContactNumber: o
    .string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      'string.pattern.base': 'Mother contact number must be 10 digits',
    }),
  residencyStatus: o.any().required(),
  ethnicity: o.string().required().max(20),
  nationality: o.any().required(),

  // Academic
  degreeLevel: o.any().required(),
  programOfStudy: o.any().required(),
  specialisation: o.any().required(),
  previousInstitutionType: o.string().required().max(15),
  previousInstitutionCgpa: o.number().required().min(0).max(10),

  // Address
  addressType: o.any().required(),
  country: o.string().required().max(20),
  state: o.any().required(),
  division: o.any().required(),
  district: o.any().required(),
  tehsil: o.any().required(),
  block: o.any().required(),
  addressLine1: o.string().required().max(150),
  addressLine2: o.string().required().max(150),
  landmark: o.string().required().max(40),
  zipcode: o.number().required().max(2147483647),
}));

export function useApplicationForm() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    getValues,
    setValue,
  } = useAppForm<ApplicationFormData>({
    resolver: validation.resolver(schema),
  });

  return {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    getValues,
    setValue,
  };
}
