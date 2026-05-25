import { TextBox, DropDownList, DatePicker } from 'shared/components/forms';
import { FormActions, FormGrid } from 'shared/new-components';
import { useSessionForm } from './form.hook';
import { SESSION_TYPES, APP_STATUS_OPTIONS } from '../types';
import type { SessionFormData } from '../types';

interface SessionFormProps {
  onSubmit: Forms.SubmitFunc<SessionFormData>;
  fetchData?: Forms.FetchDataFunc<SessionFormData>;
  isSaving?: boolean;
  isEditMode?: boolean;
}

export default function SessionForm(props: SessionFormProps) {
  const { register, handleSubmit, reset, control } = useSessionForm(
    props.onSubmit,
    props.fetchData
  );

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid columns={2}>
        <TextBox
          label="Session Name"
          placeholder="Enter session name"
          {...register('sessionName')}
          maxLength={100}
          required
        />

        <DropDownList
          label="Session Type"
          data={SESSION_TYPES}
          textField="label"
          valueField="value"
          {...register('sessionType')}
          required
        />

        <DatePicker
          label="Start Date & Time"
          control={control}
          name="startDateTime"
          showTime
          hourFormat="24"
          required
        />

        <DatePicker
          label="End Date & Time"
          control={control}
          name="endDateTime"
          showTime
          hourFormat="24"
          required
        />

        <DropDownList
          label="Application Status"
          data={APP_STATUS_OPTIONS}
          textField="label"
          valueField="value"
          {...register('appStatus')}
          required
        />

        <DatePicker
          label="Session From"
          control={control}
          name="sessionFrom"
          required
        />

        <DatePicker
          label="Session To"
          control={control}
          name="sessionTo"
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
