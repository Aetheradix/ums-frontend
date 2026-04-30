import { ActionButtons } from 'features/components';
import { TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useStateForm } from './form.hook';

interface StateFormProps {
  onSubmit: (data: Master.StateForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.StateForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function StateForm(props: StateFormProps) {
  const { register, handleSubmit, reset } = useStateForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox
          label="Code"
          placeholder="Enter State Code"
          {...register('code')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter State Name"
          {...register('name')}
          maxLength={50}
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
