import { FormCard, FormPage } from 'shared/new-components';
import RoleFeatureMappingForm from '../components/RoleFeatureMappingForm';

export default function List() {
  return (
    <FormPage
      title="Role Feature Mappings"
      description="Manage features and actions accessible to each role."
    >
      <FormCard>
        <RoleFeatureMappingForm />
      </FormCard>
    </FormPage>
  );
}
