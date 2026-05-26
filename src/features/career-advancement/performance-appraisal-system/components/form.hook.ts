import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema =
  validation.create<CareerAdvancement.PerformanceAppraisalApplicationForm>(
    o => ({
      employeeName: o.string().required(),
      employeeId: o.string().required(),
      designationId: o.number().required(),
      dateOfBirth: o.date().required(),
      casteId: o.number().required(),
      departmentId: o.number().required(),
      dateOfJoining: o.date().required(),
      stageApplyingFor: o.string().required(),
      applicationSubmissionDate: o.date().required(),
      lastPromotionDate: o.date().required(),
    })
  );

export function usePerformanceAppraisalForm(
  submitCallback: Forms.SubmitFunc<CareerAdvancement.PerformanceAppraisalApplicationForm>,
  defaultValues?: Forms.FetchDataFunc<CareerAdvancement.PerformanceAppraisalApplicationForm>
) {
  const { register, handleSubmit, reset, control } =
    useAppForm<CareerAdvancement.PerformanceAppraisalApplicationForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    handleSubmit: handleSubmit(submitCallback),
    reset,
    control,
  };
}
