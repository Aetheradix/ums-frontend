import { ActionButtons } from 'features/components';
import SelectOfficeType from 'features/components/SelectOfficeType';
import { TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useDepartmentForm } from './form.hook';

interface DepartmentFormProps {
  onSubmit: (data: Master.DepartmentForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.DepartmentForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DepartmentForm(props: DepartmentFormProps) {
  const { register, handleSubmit, reset } = useDepartmentForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox
          label="Code"
          placeholder="Enter Department Code "
          {...register('code')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name "
          subLabel="(In English)"
          placeholder="Enter Department Name"
          {...register('name')}
          maxLength={40}
          required
        />
        <SelectOfficeType {...register('officeTypeId')} />
        <TextBox
          label="HOD Name"
          placeholder="Enter HOD Name"
          {...register('hodName')}
          required
        />
        <TextBox
          label="Contact Number"
          placeholder="Enter Contact Number"
          {...register('contactNumber')}
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
