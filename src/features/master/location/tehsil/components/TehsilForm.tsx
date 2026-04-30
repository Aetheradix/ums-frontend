import { ActionButtons } from 'features/components';
import SelectDistrict from 'features/components/SelectDistrict';
import { TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useTehsilForm } from './form.hook';

interface TehsilFormProps {
  onSubmit: (data: Master.TehsilForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.TehsilForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function TehsilForm(props: TehsilFormProps) {
  const { register, handleSubmit, reset } = useTehsilForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox
          label="Code"
          placeholder="Enter Tehsil Code"
          {...register('code')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Tehsil Name"
          {...register('name')}
          maxLength={50}
          required
        />
        <SelectDistrict {...register('districtId')} />
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
