import { useSchemeTypesQuery } from 'features/master/schemes/scheme-type/queries';
import { useSchemesCategoriesQuery } from 'features/master/schemes/scheme-category/queries';
import { DropDownList, TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useSchemeForm } from './form.hook';

interface SchemeFormProps {
  onSubmit: (data: Master.Scheme.SchemeForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.Scheme.SchemeForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function SchemeForm(props: SchemeFormProps) {
  const { register, handleSubmit, reset, control, watch } = useSchemeForm(
    props.onSubmit,
    props.fetchData
  );
  const { data: schemeTypes = [] } = useSchemeTypesQuery();
  const { data: schemeCategories = [] } = useSchemesCategoriesQuery();

  // Watch the schemeTypeId field to filter categories
  const selectedSchemeTypeId = watch('schemeTypeId');

  const schemeTypeOptions = schemeTypes.map(st => ({
    value: st.id,
    text: st.name,
  }));

  // Filter categories based on selected scheme type
  const filteredCategories = selectedSchemeTypeId
    ? schemeCategories.filter(
        (sc: Master.Scheme.SchemeCategoryItem) =>
          sc.schemeTypeId === selectedSchemeTypeId
      )
    : [];

  const schemeCategoryOptions = filteredCategories.map(
    (sc: Master.Scheme.SchemeCategoryItem) => ({
      value: sc.id,
      text: sc.name,
    })
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <DropDownList
          name="schemeTypeId"
          control={control}
          label="Scheme Type"
          data={schemeTypeOptions}
          textField="text"
          valueField="value"
          required
          defaultOptionText="Select Scheme Type"
        />
        <DropDownList
          name="schemeCategoryId"
          control={control}
          label="Scheme Category"
          data={schemeCategoryOptions}
          textField="text"
          valueField="value"
          required
          defaultOptionText={
            selectedSchemeTypeId
              ? 'Select Scheme Category'
              : 'Select Scheme Type First'
          }
          disabled={!selectedSchemeTypeId}
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Scheme Name"
          {...register('name')}
          maxLength={100}
          required
        />
        <TextBox
          label="Code"
          subLabel="(In English)"
          placeholder="Enter Scheme Code"
          {...register('code')}
          maxLength={50}
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
