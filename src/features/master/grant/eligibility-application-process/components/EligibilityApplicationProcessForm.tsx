import SelectGrantType from 'features/components/SelectGrantType';
import { TextBox, TextArea } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useEligibilityApplicationProcessForm } from './form.hook';

interface EligibilityApplicationProcessFormProps {
  onSubmit: (data: Master.Grant.EligibilityApplicationProcessForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.Grant.EligibilityApplicationProcessForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function EligibilityApplicationProcessForm(props: EligibilityApplicationProcessFormProps) {
  const { register, handleSubmit, reset } = useEligibilityApplicationProcessForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <SelectGrantType {...register('grantTypeId')} />
        <TextBox
          label="Grant Category ID"
          placeholder="Enter Grant Category ID"
          {...register('grantCategoryId')}
          maxLength={10}
          required
        />
      </FormGrid>

      <FormGrid columns={1}>
        <TextArea
          label="Eligibility Text"
          placeholder="Enter eligibility criteria"
          {...register('eligibilityText')}
          required
        />
      </FormGrid>

      <FormGrid columns={1}>
        <TextArea
          label="Application Process Text"
          placeholder="Enter application process steps"
          {...register('applicationProcessText')}
          required
        />
      </FormGrid>

      <FormGrid columns={1}>
        <TextArea
          label="Approval Process Text"
          placeholder="Enter approval process workflow"
          {...register('approvalProcessText')}
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


