import { ActionButtons } from 'features/components';
import SelectDivision from 'features/components/SelectDivision';
import { TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useDistrictForm } from './form.hook';

interface DistrictFormProps {
  onSubmit: (data: Master.DistrictForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.DistrictForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DistrictForm(props: DistrictFormProps) {
  const { register, handleSubmit, reset } = useDistrictForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox
          label="Code"
          placeholder="Enter District Code"
          {...register('code')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter District Name"
          {...register('name')}
          maxLength={50}
          required
        />
        <SelectDivision {...register('divisionId')} />
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
