import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';
import type { SessionFormData } from '../types';

const schema = validation.create<SessionFormData>(o => ({
  sessionName: o.string().required().max(100),
  sessionType: o.string().required(),
  startDateTime: o.date().required(),
  endDateTime: o.date().required(),
  appStatus: o.string().required(),
  sessionFrom: o.date().required(),
  sessionTo: o.date().required(),
}));

export function useSessionForm(
  submitCallback: Forms.SubmitFunc<SessionFormData>,
  defaultValues?: Forms.FetchDataFunc<SessionFormData>
) {
  const { register, handleSubmit, reset, control } =
    useAppForm<SessionFormData>({
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
