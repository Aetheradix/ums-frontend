import { errors } from 'config/errors';
import Joi from 'joi';
import validation, { expressions, keys } from 'shared/utils/validation';
import { useAppForm } from 'shared/hooks/form';

export const STEP_FIELDS: Record<
  number,
  (keyof AffiliationManagementSystem.CollegeApplicationFormData)[]
> = {
  0: [
    'collegeCode',
    'establishmentYearId',
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
    'numberOfClassRooms',
    'deficiencyEarlierRaisedByCommittee',
    'deficiencyStatus',
    'deficiencyReason',
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
  3: ['nocFile', 'affidavitFile', 'regularAuthorityFile'],
};

const pdfFileValidator = (o: Joi.Root) =>
  o
    .any()
    .custom((value: unknown, helpers: Joi.CustomHelpers) => {
      if (value instanceof File) {
        if (value.type !== 'application/pdf') {
          return helpers.error('any.invalid');
        }
        if (value.size < 50 * 1024 || value.size > 250 * 1024) {
          return helpers.error('any.invalid');
        }
      }
      return value;
    })
    .messages({
      'any.invalid': 'Invalid file (PDF only, size between 50KB and 250KB)',
    });

const schema =
  validation.create<AffiliationManagementSystem.CollegeApplicationFormData>(
    o => ({
      // Step 1 — College Registration
      collegeCode: o.string().required().max(20),
      establishmentYearId: o.number().required(),
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
      numberOfClassRooms: o.number().required(),
      deficiencyEarlierRaisedByCommittee: o.string().required(),
      deficiencyStatus: o
        .string()
        .max(50)
        .when('deficiencyEarlierRaisedByCommittee', {
          is: 'Yes',
          then: o.string().required().max(50),
          otherwise: o.string().optional().allow('', null),
        }),
      deficiencyReason: o
        .string()
        .max(500)
        .when('deficiencyStatus', {
          is: 'Pending',
          then: o.string().required().max(500),
          otherwise: o.string().optional().allow('', null),
        }),

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
            programmeFeesMappingId: o.number().required(),
            courseId: o.number().optional(),
            subjectId: o.number().optional(),
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
  const { register, control, handleSubmit, reset, trigger } =
    useAppForm<AffiliationManagementSystem.CollegeApplicationFormData>({
      resolver: validation.resolver(schema),
      mode: 'onChange',
    });

  return {
    register,
    control,
    handleSubmit,
    reset,
    trigger,
  };
}
