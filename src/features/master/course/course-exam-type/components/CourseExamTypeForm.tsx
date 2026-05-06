import { TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useCourseExamTypeForm } from './form.hook';

interface CourseExamTypeFormProps {
  onSubmit: (data: CourseMaster.CourseExamTypeForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<CourseMaster.CourseExamTypeForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function CourseExamTypeForm(props: CourseExamTypeFormProps) {
  const { register, handleSubmit, reset } = useCourseExamTypeForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Code"
          placeholder="Enter Exam Type Code"
          {...register('code')}
          maxLength={10}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Exam Type Name"
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
