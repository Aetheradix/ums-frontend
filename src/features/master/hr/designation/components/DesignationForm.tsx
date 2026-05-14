import { TextBox, NumberBox, DropDownList } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useDesignationForm } from './form.hook';

interface DesignationFormProps {
  onSubmit: (data: Master.HR.DesignationForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<Master.HR.DesignationForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function DesignationForm(props: DesignationFormProps) {
  const { register, handleSubmit, reset } = useDesignationForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <DropDownList
          label="Class"
          placeholder="Select Class"
          {...register('classId')}
          required
        />
        <DropDownList
          label="Post"
          placeholder="Select Post"
          {...register('postId')}
          required
        />
        <DropDownList
          label="Designation Type"
          placeholder="Select Designation Type"
          {...register('designationTypeId')}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Designation Name"
          {...register('name')}
          maxLength={100}
          required
        />
        <TextBox
          label="Code"
          subLabel="(Designation Code)"
          placeholder="Enter Designation Code"
          {...register('code')}
          maxLength={50}
          required
        />
        <NumberBox
          label="Sequence Number"
          placeholder="Enter Sequence Number"
          {...register('sequenceNumber')}
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
