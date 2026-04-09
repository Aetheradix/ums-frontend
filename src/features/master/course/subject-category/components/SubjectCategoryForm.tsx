import { ActionButtons } from 'features/components';
import { TextBox } from 'shared/components/forms';
import { InputPanel } from 'shared/components/panels';
import { useSubjectCategoryForm } from './form.hook';

interface SubjectCategoryFormProps {
  onSubmit: (data: CourseMaster.SubjectCategoryCourseForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<CourseMaster.SubjectCategoryCourseForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function SubjectCategoryCourseForm(
  props: SubjectCategoryFormProps
) {
  const { register, handleSubmit, reset } = useSubjectCategoryForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <InputPanel orientation="horizontal">
        <TextBox
          label="Code"
          placeholder="Enter Category Code "
          {...register('categoryCode')}
          maxLength={5}
          required
        />
        <TextBox
          label="Name "
          subLabel="(In English)"
          placeholder="Enter Category Name"
          {...register('categoryName')}
          maxLength={40}
          required
        />
        <TextBox
          label="Name "
          subLabel="(In Hindi)"
          placeholder="Enter Category Name (Hindi)"
          {...register('categoryNameHindi')}
          maxLength={20}
          required
        />
      </InputPanel>

      <ActionButtons
        update={props.isEditMode}
        isLoading={props.isSaving}
        onSave={handleSubmit}
        onReset={reset}
      />
    </form>
  );
}
