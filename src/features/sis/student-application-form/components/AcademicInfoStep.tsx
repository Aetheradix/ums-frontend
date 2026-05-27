import { NumberBox, TextBox } from 'shared/components/forms';
import SelectAcademicYearSession from 'features/components/SelectAcademicYearSession';
import SelectDegreeLevel from 'features/components/SelectDegreeLevel';
import SelectProgramme from 'features/components/SelectProgramme';
import SelectSpecialisation from 'features/components/SelectSpecialisation';
import SelectCourseMode from 'features/components/SelectProgramModeOfEducation';
import { FormCard, FormGrid } from 'shared/new-components';
import type { ApplicationFormData } from '../types';

interface AcademicInfoStepProps {
  register: (key: keyof ApplicationFormData) => any;
}

export default function AcademicInfoStep({ register }: AcademicInfoStepProps) {
  return (
    <FormCard title="Academic Details" icon="book">
      <FormGrid columns={3}>
        <SelectAcademicYearSession
          label="Academic Session"
          {...register('academicSession')}
          required
        />
        <SelectProgramme {...register('programme')} required />
        <SelectDegreeLevel {...register('degreeLevel')} required />
        <SelectCourseMode
          label="Program of Study"
          {...register('programOfStudy')}
          required
        />
        <SelectSpecialisation {...register('specialisation')} required />
        <TextBox
          label="Previous Institution Type"
          placeholder="e.g. School, College"
          {...register('previousInstitutionType')}
          maxLength={15}
          required
        />
        <NumberBox
          label="Previous Institution CGPA"
          placeholder="Enter CGPA"
          {...register('previousInstitutionCgpa')}
          min={0}
          max={10}
          useGrouping={false}
          required
        />
      </FormGrid>
    </FormCard>
  );
}
