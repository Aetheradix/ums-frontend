import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useDegreeLevelForm } from './form.hook';

interface DegreeLevelFormProps {
  onSubmit: (data: Master.Other.DegreeLevelForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.Other.DegreeLevelForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DegreeLevelForm(props: DegreeLevelFormProps) {
  const { register, handleSubmit, reset, setValue } = useDegreeLevelForm(
    props.onSubmit,
    props.fetchData
  );

  const capitalizeWords = (value: string) => {
    if (!value) return value;
    return value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={1}>
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Degree Level Name"
          {...register('name')}
          onChange={value => setValue('name', capitalizeWords(value))}
          maxLength={50}
          required
        />
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
