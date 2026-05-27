import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema =
  validation.create<CareerAdvancement.PerformanceAppraisalApplicationForm>(
    o => ({
      stageApplyingFor: o.string().required(),
      applicationSubmissionDate: o.date().required(),
      status: o.string().required(),
      assessmentSessionId: o.number().required(),
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
