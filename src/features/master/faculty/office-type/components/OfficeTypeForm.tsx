import { ActionButtons } from 'features/components';
import { TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useOfficeTypeForm } from './form.hook';

interface OfficeTypeFormProps {
  onSubmit: (data: OfficeTypeMaster.OfficeTypeForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<OfficeTypeMaster.OfficeTypeForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function OfficeTypeForm(props: OfficeTypeFormProps) {
  const { register, handleSubmit, reset } = useOfficeTypeForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox
          label="Code"
          placeholder="Enter Office Type Code "
          {...register('code')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name "
          subLabel="(In English)"
          placeholder="Enter Office Type Name"
          {...register('name')}
          maxLength={40}
          required
        />
      </InputPanel>

      <ActionButtons
        update={props.isEditMode}
        isLoading={props.isSaving}
        onSave={handleSubmit}
        onReset={reset}
        saveLabel={''}
      />
    </form>
  );
}
