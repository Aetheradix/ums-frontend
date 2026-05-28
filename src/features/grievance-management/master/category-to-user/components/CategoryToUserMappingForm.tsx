import { useState } from 'react';
import { Button, ButtonPanel } from 'shared/components/buttons';
import { InputPanel } from 'shared/components/panels';
import { useCategoryToUserMappingForm } from './form.hook';

interface CategoryToUserMappingFormProps {
  onSubmit: (data: Grievance.CategoryToUserMappingForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Grievance.CategoryToUserMappingForm>;
  isSaving?: boolean;
}

export default function CategoryToUserMappingForm(
  props: CategoryToUserMappingFormProps
) {
  const [formKey, setFormKey] = useState(0);
  const { handleSubmit, reset } = useCategoryToUserMappingForm(
    props.onSubmit,
    props.fetchData
  );
  const handleReset = () => {
    reset();
    setFormKey(prev => prev + 1);
  };

  return (
    <form onSubmit={handleSubmit} key={formKey}>
      <InputPanel orientation="horizontal"></InputPanel>
      <ButtonPanel>
        <Button
          type="submit"
          label="Save"
          isLoading={props.isSaving}
          icon="save"
        />
        <Button
          type="button"
          label="Reset"
          icon="refresh"
          isLoading={props.isSaving}
          onClick={handleReset}
        />
      </ButtonPanel>
    </form>
  );
}
