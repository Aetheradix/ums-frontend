import { useAppForm } from 'shared/hooks/form';
import validation from 'shared/utils/validation';

const schema =
  validation.create<Master.SubjectMaster.ProgrammeSpecializationStructureForm>(
    o => ({
      programmeId: o.number().required().min(1),
      specializationId: o.number().required().min(1),
      modeOfEducationId: o.number().required().min(1),
      semesterName: o.string().max(50).required(),
      subjectId: o.number().required().min(1),
      lectureStructure: o.number().allow(null).min(0),
      tutorialStructure: o.number().allow(null).min(0),
      practicalStructure: o.number().allow(null).min(0),
      totalCredits: o.number().required().min(1),
    })
  );

export function useProgrammeSpecializationStructureForm(
  submitCallback: Forms.SubmitFunc<Master.SubjectMaster.ProgrammeSpecializationStructureForm>,
  defaultValues?: Forms.FetchDataFunc<Master.SubjectMaster.ProgrammeSpecializationStructureForm>
) {
  const { register, control, handleSubmit, reset } =
    useAppForm<Master.SubjectMaster.ProgrammeSpecializationStructureForm>({
      defaultValues: defaultValues,
      resolver: validation.resolver(schema),
    });

  return {
    register,
    control,
    handleSubmit: handleSubmit(submitCallback),
    reset,
  };
}
