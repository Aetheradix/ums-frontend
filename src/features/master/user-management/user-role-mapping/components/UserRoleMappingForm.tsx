import { TextBox } from '../../../../../shared/components/forms';
import { FormActions, FormGrid } from '../../../../../shared/new-components';
import { useUserRoleMappingForm } from './form.hook';

interface UserRoleMappingFormProps {
  onSubmit: (data: Master.UserManagement.UserRoleMappingForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.UserManagement.UserRoleMappingForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function UserRoleMappingForm(props: UserRoleMappingFormProps) {
  const { register, handleSubmit, reset } = useUserRoleMappingForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter User Name"
          {...register('UserId')}
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
