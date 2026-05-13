import { FormCard, FormPage } from 'shared/new-components';
import UserRoleMappingForm from '../components/UserRoleMappingForm';

export default function List() {
  return (
    <FormPage
      title="User Role Mappings"
      description="Assign system roles to specific users."
    >
      <FormCard>
        <UserRoleMappingForm />
      </FormCard>
    </FormPage>
  );
}
