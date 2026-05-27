import { useRef } from 'react';
import { Button } from 'shared/components/buttons';
import {
  FileUpload,
  RadioButtonList,
  DropDownList,
  TextBox,
} from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import Stepper, { type Step } from 'shared/new-components/Stepper';
import { usePerformanceAcademicForm } from './form.hook';

const STEPS: Step[] = [
  { label: 'Basic Details' },
  { label: 'Academic' },
  { label: 'Teaching (API)' },
  { label: 'Research (API)' },
  { label: 'Other Details (API)' },
  { label: 'Preview & Submit' },
];

interface PerformanceAcademicApplicationProps {
  onSubmit: (
    data: CareerAdvancement.PerformanceAcademicForm,
    status: 'Draft' | 'Submitted'
  ) => Promise<void>;
  onPrevious: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  initialData?: Partial<CareerAdvancement.PerformanceAcademicForm>;
  isReadOnly?: boolean;
}

export default function PerformanceAcademicApplication({
  onSubmit,
  onPrevious,
  onCancel,
  isSaving = false,
  initialData,
  isReadOnly = false,
}: PerformanceAcademicApplicationProps) {
  const submitStatusRef = useRef<'Draft' | 'Submitted'>('Submitted');

  const { control, handleSubmit } = usePerformanceAcademicForm(
    data => onSubmit(data, submitStatusRef.current),
    initialData
  );

  // Example dummy qualifications mapping
  const dummyQualifications = [
    { value: 1, label: 'Ph.D.' },
    { value: 2, label: 'Master Degree' },
    { value: 3, label: 'Bachelor Degree' },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="stepper-wrapper mb-2">
        <Stepper steps={STEPS} activeStep={1} />
      </div>

      <fieldset
        disabled={isReadOnly || isSaving}
        className="flex flex-col gap-6 border-none p-0 m-0 min-w-0"
      >
        <FormCard title="Academic">
          <FormGrid columns={2}>
            <DropDownList
              name="qualificationId"
              control={control}
              label="Highest Qualification"
              required
              data={dummyQualifications}
              textField="label"
              valueField="value"
            />

            <TextBox
              name="universityInstitution"
              control={control}
              label="University / Institution"
              placeholder="Name of awarding university"
              required
            />

            <TextBox
              name="yearOfPassing"
              control={control}
              label="Year of Passing"
              placeholder="YYYY"
              required
            />

            <RadioButtonList
              name="netsetQualified"
              control={control}
              label="NET / SET Qualified?"
              required
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              className="flex-row items-center gap-4"
            />

            <FileUpload
              name="document"
              control={control}
              label="Upload Degree Certificate"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              uploadNote="Upload Degree Certificate (Max 100KB)"
              required
              mode="file"
            />

            <FileUpload
              name="otherDocument"
              control={control}
              label="Upload Other Academic Proof"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              uploadNote="Upload any other supporting proof (Max 100KB)"
              mode="file"
            />
          </FormGrid>
        </FormCard>
      </fieldset>

      <div className="form-actions-container form-actions-right">
        <Button
          label="← Previous"
          type="button"
          onClick={onPrevious}
          variant="outlined"
          disabled={isSaving}
          className="mr-auto"
        />

        <Button
          label="Cancel Application"
          type="button"
          onClick={onCancel}
          variant="text"
          disabled={isSaving}
        />

        {!isReadOnly && (
          <>
            <Button
              label="Save as Draft"
              type="submit"
              variant="outlined"
              className="button-auto-width"
              disabled={isSaving}
              onClick={() => {
                submitStatusRef.current = 'Draft';
              }}
            />
            <Button
              label="Proceed to Next Step →"
              type="submit"
              variant="primary"
              isLoading={isSaving}
              onClick={() => {
                submitStatusRef.current = 'Submitted';
              }}
            />
          </>
        )}
      </div>
    </form>
  );
}
