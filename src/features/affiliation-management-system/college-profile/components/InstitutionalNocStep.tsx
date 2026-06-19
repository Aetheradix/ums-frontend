import SelectNocType from 'features/components/SelectNocType';
import type { Control, Path } from 'react-hook-form';
import { Controller, useFieldArray } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import {
  DatePicker,
  DropDownList,
  RadioButtonList,
  TextBox,
} from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

interface InstitutionalNocStepProps {
  register: (
    key: Path<AffiliationManagementSystem.CollegeProfileWizardData>
  ) => {
    control: Control<AffiliationManagementSystem.CollegeProfileWizardData>;
    name: Path<AffiliationManagementSystem.CollegeProfileWizardData>;
  };
  control: Control<AffiliationManagementSystem.CollegeProfileWizardData>;
}

const AFFILIATION_MODES = [
  { id: 'New Affiliation', name: 'New Affiliation' },
  {
    id: 'Existing College - Yearly Renewal form for Affiliation',
    name: 'Existing College - Yearly Renewal form for Affiliation',
  },
  { id: 'Temporary Affiliation', name: 'Temporary Affiliation' },
];

export default function InstitutionalNocStep({
  register,
  control,
}: InstitutionalNocStepProps) {
  const {
    fields: nocFields,
    append: appendNoc,
    remove: removeNoc,
  } = useFieldArray({
    control,
    name: 'nocDetails',
  });

  return (
    <>
      <FormCard
        title="Affiliation & College Mode Details"
        subtitle="Specify the college affiliation application mode, status, and fees."
        icon="building"
      >
        <FormGrid columns={3}>
          <TextBox
            label="Application Number"
            placeholder="Enter Application Number"
            {...register('applicationNo')}
            maxLength={50}
            required
          />

          <TextBox
            label="Name of College/Society"
            placeholder="Enter Name of College/Society"
            {...register('nameOfCollegeSociety')}
            maxLength={200}
            required
          />

          <DropDownList
            data={AFFILIATION_MODES}
            textField="name"
            valueField="id"
            optionValue="id"
            label="Mode of Affiliation"
            placeholder="Select Mode of Affiliation"
            {...register('modeOfAffiliation')}
            required
          />

          <RadioButtonList
            control={control}
            name="collegeStatus"
            label="College Status"
            required
            variant="vertical"
            optionLayout="horizontal"
            options={[
              { label: 'New College', value: 'New College' },
              { label: 'Old College', value: 'Old College' },
            ]}
          />
        </FormGrid>
      </FormCard>

      <FormCard
        title="Regulatory NOC Details *"
        subtitle="Manage the regulatory body NOC reference details."
        icon="shield"
        headerAction={
          <Button
            label="Add New NOC"
            icon="plus"
            type="button"
            variant="outlined"
            onClick={() =>
              appendNoc({
                nocStatus: 'Yes',
                nocTypeId: 0,
                nocReferenceNo: '',
                issueDate: null,
              })
            }
          />
        }
      >
        {nocFields.length === 0 ? (
          <div className="text-center p-6 text-gray-500 border border-dashed rounded-lg bg-gray-50">
            No NOC details added yet. Click &quot;Add New NOC&quot; to add.
          </div>
        ) : (
          <div className="noc-table-container overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                  <th className="p-3 border-r border-gray-200">STATUS</th>
                  <th className="p-3 border-r border-gray-200">NOC TYPE</th>
                  <th className="p-3 border-r border-gray-200">
                    NOC REFERENCE NO.
                  </th>
                  <th className="p-3 border-r border-gray-200">ISSUE DATE</th>
                  <th className="p-3 text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {nocFields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '130px' }}
                    >
                      <Controller
                        control={control}
                        name={`nocDetails.${index}.nocStatus` as const}
                        render={({ field }) => (
                          <div className="flex gap-4 items-center bg-slate-100/70 border border-slate-200 rounded-md px-3 py-1.5 w-fit">
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-gray-700">
                              <input
                                type="radio"
                                value="Yes"
                                className="p-radiobutton"
                                checked={field.value === 'Yes'}
                                onChange={() => field.onChange('Yes')}
                              />
                              Yes
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-gray-700">
                              <input
                                type="radio"
                                value="No"
                                className="p-radiobutton"
                                checked={field.value === 'No'}
                                onChange={() => field.onChange('No')}
                              />
                              No
                            </label>
                          </div>
                        )}
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '200px' }}
                    >
                      <SelectNocType
                        label=""
                        defaultOptionText="Select NOC Type"
                        {...register(`nocDetails.${index}.nocTypeId` as const)}
                        required
                        appendTo={document.body}
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '220px' }}
                    >
                      <TextBox
                        label=""
                        placeholder="e.g. NOC-2026/88"
                        {...register(
                          `nocDetails.${index}.nocReferenceNo` as const
                        )}
                        maxLength={100}
                        required
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '180px' }}
                    >
                      <DatePicker
                        label=""
                        placeholder="Select issue date"
                        {...register(`nocDetails.${index}.issueDate` as const)}
                        required
                        appendTo={document.body}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <Button
                        icon="trash"
                        variant="outlined"
                        type="button"
                        onClick={() => removeNoc(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FormCard>
    </>
  );
}
