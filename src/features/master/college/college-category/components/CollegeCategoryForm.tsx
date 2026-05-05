import { TextBox } from 'shared/components/forms';
import DropDownList from 'shared/components/forms/DropDownList';
import { InputPanel } from 'shared/components/panels';
import { FormActions, FormGrid } from 'shared/new-components';
import { useCollegeTypesQuery } from 'features/master/college/college-type/queries';
import { useCollegeCategoryForm } from './form.hook';

interface CollegeCategoryFormProps {
  onSubmit: (data: CollegeMaster.CollegeCategoryForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<CollegeMaster.CollegeCategoryForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function CollegeCategoryForm(props: CollegeCategoryFormProps) {
  const { register, handleSubmit, reset } = useCollegeCategoryForm(
    props.onSubmit,
    props.fetchData
  );

  const { data: collegeTypes } = useCollegeTypesQuery();

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <DropDownList
          label="College Type"
          {...register('collegeTypeId')}
          data={collegeTypes}
          textField="name"
          valueField="id"
          defaultOptionText="Select College Type"
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter College Category Name"
          {...register('name')}
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
