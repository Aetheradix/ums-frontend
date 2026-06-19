import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useNocTypeForm } from './form.hook';

interface NocTypeFormProps {
  onSubmit: (data: CollegeMaster.NocTypeForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<CollegeMaster.NocTypeForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function NocTypeForm(props: NocTypeFormProps) {
  const { register, handleSubmit, reset } = useNocTypeForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="NOC Type Name"
          subLabel="(In English)"
          placeholder="Enter NOC Type Name"
          {...register('nocTypeName')}
          maxLength={100}
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
