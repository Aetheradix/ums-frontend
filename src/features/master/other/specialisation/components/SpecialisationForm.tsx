import SelectProgramme from 'features/components/SelectProgramme';
import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useSpecialisationForm } from './form.hook';

interface SpecialisationFormProps {
  onSubmit: (data: Master.Other.SpecialisationForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.Other.SpecialisationForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function SpecialisationForm(props: SpecialisationFormProps) {
  const { register, handleSubmit, reset, setValue } = useSpecialisationForm(
    props.onSubmit,
    props.fetchData
  );

  const capitalizeWords = (value: string) => {
    if (!value) return value;
    return value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Specialisation Name"
          {...register('name')}
          onChange={value => setValue('name', capitalizeWords(value))}
          maxLength={50}
          required
        />
        <SelectProgramme {...register('programmeId')} />
      </FormGrid>

      <FormActions
        isEditMode={props.isEditMode}
        isLoading={props.isSaving}
        onSave={handleSubmit}
        onReset={reset}
      />
    </form>
  );
}
