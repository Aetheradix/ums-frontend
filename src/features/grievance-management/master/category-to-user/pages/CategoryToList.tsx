import { FormCard, FormPage } from 'shared/new-components';
import { Column, Row } from 'shared/new-components/column';
import GrievanceCategory from '../../grievance-category';
import CategoryToUserMappingForm from '../components/CategoryToUserMappingForm';
import List from './List';

export default function CategoryToList() {
  return (
    <FormPage
      title="Category To User Mapping"
      description="Manage the list of all category to user mappings in the system."
    >
      <FormCard>
        <Row>
          <Column span={6}>
            <GrievanceCategory />
          </Column>
          <Column span={6}>
            <List />
          </Column>
        </Row>
      </FormCard>
      <CategoryToUserMappingForm
        onSubmit={function (
          _data: Grievance.CategoryToUserMappingForm
        ): Promise<void> {
          throw new Error('Function not implemented.');
        }}
      />
    </FormPage>
  );
}
