import SelectCourseDepartment from 'features/components/SelectCourseDepartment';
import SelectCourseExamType from 'features/components/SelectCourseExamType';
import SelectCourseLevel from 'features/components/SelectCourseLevel';
import SelectCourseMode from 'features/components/SelectCourseMode';
import SelectCourseStream from 'features/components/SelectCourseStream';
import SelectCourseTenure from 'features/components/SelectCourseTenure';
import { NumberBox, TextArea, TextBox } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useCourseMasterForm } from './form.hook';

interface CourseMasterFormProps {
  onSubmit: (data: CourseMaster.CourseMasterForm) => Promise<void>;
  fetchData?: Forms.FetchDataFunc<CourseMaster.CourseMasterForm>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function CourseMasterForm(props: CourseMasterFormProps) {
  const { register, handleSubmit, reset, control } = useCourseMasterForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Code"
          placeholder="Enter Course Code"
          {...register('code')}
          maxLength={10}
          required
        />
        <TextBox
          label="Name"
          subLabel="(In English)"
          placeholder="Enter Course Name"
          {...register('name')}
          maxLength={100}
          required
        />
        <SelectCourseLevel control={control} name="levelId" />
        <SelectCourseDepartment control={control} name="departmentId" />
        <SelectCourseStream control={control} name="streamId" />
        <SelectCourseMode control={control} name="modeId" />
        <SelectCourseTenure control={control} name="tenureId" />
        <SelectCourseExamType control={control} name="examTypeId" />

        <NumberBox
          label="Total Terms"
          placeholder="Enter Total Terms"
          control={control}
          name="totalTerms"
          required
        />
        <TextArea
          label="Description"
          placeholder="Enter Description"
          {...register('description')}
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
