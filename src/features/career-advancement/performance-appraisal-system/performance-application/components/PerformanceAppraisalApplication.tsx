import SelectAssessmentSession from 'features/components/SelectAssessmentSession';
import SelectStageApplying from 'features/components/SelectStageApplying';
import { useRef } from 'react';
import { Button } from 'shared/components/buttons';
import { DatePicker, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import Stepper, { type Step } from 'shared/new-components/Stepper';
import { usePerformanceAppraisalForm } from './form.hook';

const STEPS: Step[] = [
  { label: 'Basic Details' },
  { label: 'Academic' },
  { label: 'Teaching (API)' },
  { label: 'Research (API)' },
  { label: 'Other Details (API)' },
  { label: 'Preview & Submit' },
];

interface PerformanceAppraisalApplicationProps {
  onSubmit: (
    data: CareerAdvancement.PerformanceAppraisalApplicationForm,
    status: 'Draft' | 'Submitted'
  ) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
  initialData?: Partial<CareerAdvancement.PerformanceAppraisalApplicationForm>;
  isReadOnly?: boolean;
}

export default function PerformanceAppraisalApplication({
  onSubmit,
  onCancel,
  isSaving = false,
  initialData,
  isReadOnly = false,
}: PerformanceAppraisalApplicationProps) {
  const submitStatusRef = useRef<'Draft' | 'Submitted'>('Submitted');

  const { register, handleSubmit } = usePerformanceAppraisalForm(
    data => onSubmit(data, submitStatusRef.current),
    initialData
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="stepper-wrapper mb-2">
        <Stepper steps={STEPS} activeStep={0} />
      </div>

      <fieldset
        disabled={isReadOnly || isSaving}
        className="flex flex-col gap-6 border-none p-0 m-0 min-w-0"
      >
        <FormCard title="Basic Details" icon="user">
          <FormGrid columns={2}>
            {/* --- Dummy Fields (will be made dynamic later) --- */}
            <TextBox
              label="Employee Name"
              name="dummy_employeeName"
              value="Dr. Ramesh Kumar"
              disabled
            />
            <TextBox
              label="Employee ID"
              name="dummy_employeeId"
              value="EMP001"
              disabled
            />
            <TextBox
              label="Designation"
              name="dummy_designation"
              value="Assistant Professor"
              required
              disabled
            />
            <TextBox
              label="Date of Birth"
              name="dummy_dob"
              value="15-05-1980"
              required
              disabled
              icon="calendar"
              iconPosition="right"
            />
            <TextBox
              label="Category"
              name="dummy_category"
              value="General"
              required
              disabled
            />
            <TextBox
              label="Department"
              name="dummy_department"
              value="Computer Science"
              required
              disabled
            />
            <TextBox
              label="Date of Joining"
              name="dummy_doj"
              value="01-08-2010"
              required
              disabled
              icon="calendar"
              iconPosition="right"
            />
            {/* ------------------------------------------------ */}

            <SelectStageApplying
              {...register('stageApplyingFor')}
              label="Stage Applying For"
              required
            />
            <SelectAssessmentSession
              {...register('assessmentSessionId')}
              label="Assessment Session"
            />

            <DatePicker
              {...register('applicationSubmissionDate')}
              label="Application Submission Date"
              required
            />
          </FormGrid>
        </FormCard>
      </fieldset>

      {/* Actions */}
      <div className="form-actions-container form-actions-right">
        <Button
          label={isReadOnly ? 'Back' : 'Cancel Application'}
          type="button"
          onClick={onCancel}
          icon="times"
          variant="outlined"
          disabled={isSaving}
        />
        {!isReadOnly && (
          <>
            <Button
              label="Save as Draft"
              type="submit"
              icon="save"
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
              icon="arrow-right"
              variant="success"
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
