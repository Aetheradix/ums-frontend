import { FormActions, FormGrid } from 'shared/new-components';
import { TextBox } from 'shared/components/forms';
import { useOfficeTypeForm } from './form.hook';

interface OfficeTypeFormProps {
  onSubmit: (data: Master.OfficeTypeForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.OfficeTypeForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function OfficeTypeForm(props: OfficeTypeFormProps) {
  const { register, handleSubmit, reset, setValue } = useOfficeTypeForm(
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
          label="Code"
          placeholder="Enter Office Type Code"
          {...register('code')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Office Type Name"
          {...register('name')}
          onChange={value => setValue('name', capitalizeWords(value))}
          maxLength={40}
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
