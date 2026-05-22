import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import SelectCategoryType from '../../components/SelectCategoryType';
import { useGrievanceCategoryForm } from './form.hook';

interface GrievanceCategoryFormProps {
  onSubmit: (data: Grievance.GrievanceCategoryForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Grievance.GrievanceCategoryForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function GrievanceCategoryForm(
  props: GrievanceCategoryFormProps
) {
  const { register, handleSubmit, reset } = useGrievanceCategoryForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <SelectCategoryType {...register('categoryType')} />
        <TextBox
          label="Code"
          subLabel="(Alphanumeric, max 3 characters)"
          placeholder="Enter Grievance Category code"
          {...register('code')}
          maxLength={3}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Grievance Category Name"
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
