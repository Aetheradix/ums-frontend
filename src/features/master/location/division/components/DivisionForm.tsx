import { ActionButtons } from 'features/components';
import SelectState from 'features/components/SelectState';
import { TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useDivisionForm } from './form.hook';

interface DivisionFormProps {
  onSubmit: (data: Master.DivisionForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.DivisionForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DivisionForm(props: DivisionFormProps) {
  const { register, handleSubmit, reset } = useDivisionForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox
          label="Code"
          placeholder="Enter Division Code"
          {...register('code')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Division Name"
          {...register('name')}
          maxLength={50}
          required
        />
        <SelectState {...register('stateId')} />
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
