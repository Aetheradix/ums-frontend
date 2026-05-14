import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema = validation.create<SIS.StudentAdditionalInformationForm>(o => ({
  studentId: o.number().required(),
  studentAcademicId: o.number().required(),
  emergencyContactName: o.string().required(),
  emergencyContact: o.string().required(),
  emergencyRelation: o.string().required(),
  emailNotification: o.boolean().optional(),
  smsNotification: o.boolean().optional(),
  pushNotification: o.boolean().optional(),
  languagePreferance: o.string().allow('', null).optional(),
  profilePhoto: o.any().allow(null).when('profilePhotoUrl', {
    is: o.string().exist(),
    then: o.optional(),
    otherwise: o.required(),
  }),
  profilePhotoUrl: o.string().allow('', null).optional(),
}));

export function useStudentAdditionalInformationForm(
  submitCallback: Forms.SubmitFunc<SIS.StudentAdditionalInformationForm>,
  fetchData?: Forms.FetchDataFunc<SIS.StudentAdditionalInformationForm>
) {
  const { register, control, handleSubmit, reset, setValue } =
    useAppForm<SIS.StudentAdditionalInformationForm>({
      defaultValues: fetchData || {
        emailNotification: false,
        smsNotification: false,
        pushNotification: false,
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
