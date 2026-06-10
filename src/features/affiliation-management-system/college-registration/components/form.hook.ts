import { errors } from 'config/errors';
import Joi from 'joi';
import { useAppForm } from 'shared/hooks/form';
import validation, { expressions, keys } from 'shared/utils/validation';

export const STEP_FIELDS: Record<
  number,
  (keyof AffiliationManagementSystem.CollegeApplicationFormData)[]
> = {
  0: [
    'collegeCode',
    'establishmentYear',
    'collegeName',
    'collegeAddress',
    'districtId',
    'telephoneNo',
    'collegeEmail',
    'collegeCategory',
    'collegeType',
    'accommodationType',
    'collegeArea',
    'availableFacilities',
    'otherFacilities',
  ],
  1: [
    'principalDirectorName',
    'principalMobileNo',
    'principalEmail',
    'societyName',
    'secretaryName',
    'societyRegistrationNo',
    'societyRegistrationDate',
    'isOtherInstitutionRunning',
  ],
  2: ['courses'],
  3: [
    'nocFile',
    'affidavitFile',
    'regularAuthorityFile',
    'applicationNumber',
    'isSubmitted',
  ],
};

const MAX_FILE_SIZE = 250 * 1024;

const pdfFileValidator = (o: Joi.Root) =>
  o
    .any()
    .custom((value: unknown, helpers: Joi.CustomHelpers) => {
      if (value instanceof File) {
        if (value.type !== 'application/pdf') {
          return helpers.error('any.invalid');
        }
        if (value.size > MAX_FILE_SIZE) {
          return helpers.error('any.invalid');
        }
      }
      return value;
    })
    .messages({
      'any.invalid': 'Invalid file (PDF only, maximum size 250KB)',
    });

const schema =
  validation.create<AffiliationManagementSystem.CollegeApplicationFormData>(
    o => ({
      // Step 1 — College Registration
      collegeCode: o.string().required().max(15),
      establishmentYear: o
        .number()
        .integer()
        .min(1800)
        .max(new Date().getFullYear())
        .required(),
      collegeName: o
        .string()
        .required()
        .max(200)
        .pattern(expressions.englishOnly)
        .messages({
          [keys.string.pattern]: errors.englishOnly,
        }),
      collegeAddress: o.string().required().max(500),
      districtId: o.number().required(),
      telephoneNo: o.string().required().max(20),
      collegeEmail: o.string().required().max(255),
      collegeCategory: o.string().required().max(50),
      collegeType: o.string().required().max(50),
      accommodationType: o.string().required().max(50),
      collegeArea: o.string().required().max(500),
      availableFacilities: o.object().required(),
      otherFacilities: o
        .array()
        .items(
          o.object().keys({
            facilityName: o.string().required().max(200),
          })
        )
        .optional(),
      applicationNumber: o.string().optional(),
      isSubmitted: o.boolean().optional(),

      // Step 2 — College Affiliation
      affiliationId: o.number().optional(),
      registrationId: o.number().optional(),
      principalDirectorName: o.string().required().max(100),
      principalMobileNo: o
        .string()
        .required()
        .max(10)
        .pattern(/^[0-9]{10}$/)
        .messages({
          [keys.string.pattern]: 'Principal mobile number must be 10 digits',
        }),
      principalEmail: o.string().required().max(70),
      societyName: o.string().required().max(200),
      societyRegistrationNo: o.string().required().max(100),
      secretaryName: o.string().required().max(100),
      societyRegistrationDate: o.date().required(),
      isOtherInstitutionRunning: o.boolean().required(),

      // Step 3 — Course Details
      courses: o
        .array()
        .items(
          o.object().keys({
            collegeCourseDetailId: o.number().optional(),
            registrationId: o.number().optional(),
            courseId: o.number().required(),
            subjectIds: o.array().items(o.number()).min(1).required(),
            totalAmount: o.number().optional(),
            isFeePaid: o.boolean().optional(),
            paymentDate: o.string().allow('', null).optional(),
          })
        )
        .min(1)
        .required(),

      // Step 4 — Enclosures
      nocFile: pdfFileValidator(o).required(),
      affidavitFile: pdfFileValidator(o).required(),
      regularAuthorityFile: pdfFileValidator(o).optional().allow(null),
    })
  );

export function useCollegeApplicationForm() {
  const { register, control, handleSubmit, reset, trigger, setValue } =
    useAppForm<AffiliationManagementSystem.CollegeApplicationFormData>({
      resolver: validation.resolver(schema),
      mode: 'onChange',
      defaultValues: {},
    });

  return {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
    setValue,
  };
}
