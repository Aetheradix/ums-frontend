import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<CareerAdvancement.EmployeeSelfAssessmentForm>(
  o => ({
    employeeId: o.number().required(),
    reviewingHeadId: o.number().required().messages({
      'any.required': 'Reporting Officer is required',
      'number.base': 'Reporting Officer is required',
    }),
    assessmentYear: o.date().required(),
    assessmentPeriodFrom: o.date().required(),
    assessmentPeriodTo: o.date().required(),
    tasksProjects: o.string().required(),
    workOutputScore: o.number().min(0).max(40).required(),
    workOutputRemarks: o.string().allow('', null).optional(),
    leadershipQuality: o.string().required(),
    communicationSkills: o.string().required(),
    integrity: o.string().required(),
    adaptability: o.string().required(),
    teamWork: o.string().required(),
    domainKnowledge: o.string().required(),
    problemSolvingAbility: o.string().required(),
    decisionMaking: o.string().required(),
    analyticalSkills: o.string().required(),
    functionalRemarks: o.string().allow('', null).optional(),
    additionalRemarks: o.string().allow('', null).optional(),
    supportingDocument: o
      .any()
      .allow(null, '')
      .custom((value, helpers) => {
        if (value instanceof File) {
          if (value.size > 5 * 1024 * 1024) {
            return helpers.error('any.invalid');
          }
        }
        return value;
      })
      .messages({
        'any.invalid': 'Invalid file (Max 5MB)',
      })
      .optional(),
    status: o.string().required(),
    isActive: o.boolean().optional(),
    selfAssessmentId: o.number().optional(),
  })
);

export function useEmployeeSelfAssessmentForm(
  submitCallback: Forms.SubmitFunc<CareerAdvancement.EmployeeSelfAssessmentForm>,
  fetchData?: Forms.FetchDataFunc<CareerAdvancement.EmployeeSelfAssessmentForm>
) {
  const { register, control, handleSubmit, reset, setValue } =
    useAppForm<CareerAdvancement.EmployeeSelfAssessmentForm>({
      defaultValues: fetchData || {
        employeeId: 1, // Default fallback
        reviewingHeadId: null,
        assessmentYear: new Date(),
        assessmentPeriodFrom: new Date(new Date().getFullYear(), 3, 1), // April 1st
        assessmentPeriodTo: new Date(new Date().getFullYear() + 1, 2, 31), // March 31st
        tasksProjects: '',
        workOutputScore: null,
        workOutputRemarks: '',
        leadershipQuality: '',
        communicationSkills: '',
        integrity: '',
        adaptability: '',
        teamWork: '',
        domainKnowledge: '',
        problemSolvingAbility: '',
        decisionMaking: '',
        analyticalSkills: '',
        functionalRemarks: '',
        additionalRemarks: '',
        supportingDocument: null,
        status: 'Draft',
        isActive: true,
      },
      resolver: validation.resolver(schema),
    });

  return {
    register,
    control,
    handleSubmit: handleSubmit(submitCallback),
    reset,
    setValue,
  };
}
