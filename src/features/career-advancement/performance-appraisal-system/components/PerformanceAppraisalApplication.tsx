import { useRef } from 'react';
import { usePerformanceAppraisalForm } from './form.hook';

import SelectCaste from 'features/components/SelectCaste';
import SelectDepartment from 'features/components/SelectDepartment';
import SelectDesignation from 'features/components/SelectDesignation';
import SelectStageApplying from 'features/components/SelectStageApplying';
import { Button } from 'shared/components/buttons';
import { DatePicker, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';
import Stepper, { type Step } from 'shared/new-components/Stepper';

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
  initialData?: CareerAdvancement.PerformanceAppraisalApplicationForm;
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

  const { control, handleSubmit, reset } = usePerformanceAppraisalForm(
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
            <TextBox
              control={control}
              name="employeeName"
              label="Employee Name"
              placeholder="e.g. Dr. Ramesh Kumar"
              required
            />
            <TextBox
              control={control}
              name="employeeId"
              label="Employee ID"
              placeholder="e.g. EMP001"
              required
            />
            <SelectDesignation
              control={control}
              name="designationId"
              label="Designation"
              required
            />
            <DatePicker
              control={control}
              name="dateOfBirth"
              label="Date of Birth"
              required
            />
            <SelectCaste
              control={control}
              name="casteId"
              label="Category"
              required
            />
            <SelectDepartment
              control={control}
              name="departmentId"
              label="Department"
              required
            />
            <DatePicker
              control={control}
              name="dateOfJoining"
              label="Date of Joining"
              required
            />
            <DatePicker
              control={control}
              name="lastPromotionDate"
              label="Last Promotion Date"
              required
            />
            <DatePicker
              control={control}
              name="applicationSubmissionDate"
              label="Application Submission Date"
              required
            />
            <SelectStageApplying
              control={control}
              name="stageApplyingFor"
              label="Stage Applying For"
              required
            />
          </FormGrid>
        </FormCard>
      </fieldset>

      {/* Actions */}
      <div className="form-actions-container form-actions-right">
        <Button
          label={isReadOnly ? 'Back' : 'Cancel'}
          type="button"
          onClick={onCancel}
          icon="times"
          variant="outlined"
          disabled={isSaving}
        />
        {!isReadOnly && (
          <>
            <Button
              label="Reset"
              type="button"
              onClick={() => reset()}
              icon="refresh"
              variant="outlined"
              disabled={isSaving}
            />
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
              label="Proceed to Next Step"
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
