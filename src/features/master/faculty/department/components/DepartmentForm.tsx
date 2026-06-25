import { SelectDepartmentGroup } from 'features/components';
import SelectOfficeType from 'features/components/SelectOfficeType';
import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useDepartmentForm } from './form.hook';

interface DepartmentFormProps {
  onSubmit: (data: Master.DepartmentForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.DepartmentForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DepartmentForm(props: DepartmentFormProps) {
  const { register, handleSubmit, reset, setValue } = useDepartmentForm(
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
          placeholder="Enter Department Code "
          {...register('code')}
          maxLength={5}
          required
        />
        <SelectDepartmentGroup {...register('departmentGroupId')} />
        <TextBox
          label="Name "
          subLabel="(In English)"
          placeholder="Enter Department Name"
          {...register('name')}
          onChange={value => setValue('name', capitalizeWords(value))}
          maxLength={40}
          required
        />
        <SelectOfficeType {...register('officeTypeId')} />
        <TextBox
          label="Hod Name"
          placeholder="Enter Hod Name"
          {...register('hodName')}
          onChange={value => setValue('hodName', capitalizeWords(value))}
          required
        />
        <TextBox
          label="Contact Number"
          placeholder="Enter Contact Number"
          {...register('contactNumber')}
          onChange={value =>
            setValue('contactNumber', value.replace(/\D/g, ''))
          }
          maxLength={15}
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
