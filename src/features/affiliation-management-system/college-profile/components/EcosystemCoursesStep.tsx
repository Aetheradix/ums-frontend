import SelectDegreeLevel from 'features/components/SelectDegreeLevel';
import SelectDepartment from 'features/components/SelectDepartment';
import SelectProgramModeOfEducation from 'features/components/SelectProgramModeOfEducation';
import type { Control, Path } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { DropDownList, TextArea, TextBox } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

interface EcosystemCoursesStepProps {
  register: (
    key: Path<AffiliationManagementSystem.CollegeProfileWizardData>
  ) => {
    control: Control<AffiliationManagementSystem.CollegeProfileWizardData>;
    name: Path<AffiliationManagementSystem.CollegeProfileWizardData>;
  };
  control: Control<AffiliationManagementSystem.CollegeProfileWizardData>;
}

const REGULATORY_MODES = [
  { id: 'Regular', name: 'Regular' },
  { id: 'Distance', name: 'Distance' },
  { id: 'Online', name: 'Online' },
];

const COURSE_LEVELS = [
  { id: 'UG', name: 'UG' },
  { id: 'PG', name: 'PG' },
  { id: 'PhD', name: 'PhD' },
  { id: 'Diploma', name: 'Diploma' },
  { id: 'Certificate', name: 'Certificate' },
];

const DURATIONS = [
  { id: '1 Year', name: '1 Year' },
  { id: '2 Years', name: '2 Years' },
  { id: '3 Years', name: '3 Years' },
  { id: '4 Years', name: '4 Years' },
  { id: '5 Years', name: '5 Years' },
];

const APPLIED_YEARS = [
  { id: '2024-25', name: '2024-25' },
  { id: '2025-26', name: '2025-26' },
  { id: '2026-27', name: '2026-27' },
  { id: '2027-28', name: '2027-28' },
  { id: '2028-29', name: '2028-29' },
];

export default function EcosystemCoursesStep({
  register,
  control,
}: EcosystemCoursesStepProps) {
  const {
    fields: existingFields,
    append: appendExisting,
    remove: removeExisting,
  } = useFieldArray({
    control,
    name: 'existingPrograms',
  });

  const {
    fields: proposedFields,
    append: appendProposed,
    remove: removeProposed,
  } = useFieldArray({
    control,
    name: 'proposedPrograms',
  });

  return (
    <>
      <FormCard
        title="Existing Academic Programmes"
        subtitle="Manage the details of currently active academic programmes at the college."
        icon="book"
        headerAction={
          <Button
            label="Add Existing Course"
            icon="plus"
            type="button"
            variant="outlined"
            onClick={() =>
              appendExisting({
                regulatoryMode: 'Regular',
                courseLevel: 'UG',
                facultyDeptId: 0,
                programmeName: '',
                durationYears: '3 Years',
                appliedYear: '2026-27',
              })
            }
          />
        }
      >
        {existingFields.length === 0 ? (
          <div className="text-center p-6 text-gray-500 border border-dashed rounded-lg bg-gray-50">
            No existing programmes added. Click &quot;Add Existing Course&quot;
            to list one.
          </div>
        ) : (
          <div className="noc-table-container overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                  <th className="p-3 border-r border-gray-200">
                    Mode (Regulatory)
                  </th>
                  <th className="p-3 border-r border-gray-200">Course Level</th>
                  <th className="p-3 border-r border-gray-200">
                    Faculty / Dept
                  </th>
                  <th className="p-3 border-r border-gray-200">
                    Programme Name
                  </th>
                  <th className="p-3 border-r border-gray-200">Duration</th>
                  <th className="p-3 border-r border-gray-200">Applied Year</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {existingFields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '150px' }}
                    >
                      <DropDownList
                        data={REGULATORY_MODES}
                        textField="name"
                        valueField="id"
                        optionValue="id"
                        label=""
                        placeholder="Select Mode"
                        {...register(
                          `existingPrograms.${index}.regulatoryMode` as const
                        )}
                        required
                        appendTo={document.body}
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '140px' }}
                    >
                      <DropDownList
                        data={COURSE_LEVELS}
                        textField="name"
                        valueField="id"
                        optionValue="id"
                        label=""
                        placeholder="Select Level"
                        {...register(
                          `existingPrograms.${index}.courseLevel` as const
                        )}
                        required
                        appendTo={document.body}
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '180px' }}
                    >
                      <SelectDepartment
                        label=""
                        defaultOptionText="Select Dept"
                        {...register(
                          `existingPrograms.${index}.facultyDeptId` as const
                        )}
                        required
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '200px' }}
                    >
                      <TextBox
                        label=""
                        placeholder="e.g. B.Tech CSE"
                        {...register(
                          `existingPrograms.${index}.programmeName` as const
                        )}
                        maxLength={200}
                        required
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '130px' }}
                    >
                      <DropDownList
                        data={DURATIONS}
                        textField="name"
                        valueField="id"
                        optionValue="id"
                        label=""
                        placeholder="Select Duration"
                        {...register(
                          `existingPrograms.${index}.durationYears` as const
                        )}
                        required
                        appendTo={document.body}
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '130px' }}
                    >
                      <DropDownList
                        data={APPLIED_YEARS}
                        textField="name"
                        valueField="id"
                        optionValue="id"
                        label=""
                        placeholder="Select Year"
                        {...register(
                          `existingPrograms.${index}.appliedYear` as const
                        )}
                        required
                        appendTo={document.body}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <Button
                        icon="trash"
                        variant="outlined"
                        type="button"
                        onClick={() => removeExisting(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FormCard>
      <FormCard
        title="Proposed New Programmes"
        subtitle="Manage the details of proposed new academic programmes to be introduced."
        icon="book"
        headerAction={
          <Button
            label="Add New Course"
            icon="plus"
            type="button"
            variant="outlined"
            onClick={() =>
              appendProposed({
                programmeType: 'Regular',
                regulatoryModelId: 0,
                courseLevelId: 0,
                facultyDeptId: 0,
                programmeName: '',
                durationYears: '3 Years',
                appliedYear: '2026-27',
              })
            }
          />
        }
      >
        {proposedFields.length === 0 ? (
          <div className="text-center p-6 text-gray-500 border border-dashed rounded-lg bg-gray-50">
            No proposed programmes added. Click &quot;Add New Course&quot; to
            list one.
          </div>
        ) : (
          <div className="noc-table-container overflow-x-auto">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase border-b border-gray-200">
                  <th className="p-3 border-r border-gray-200">
                    Mode (Regulatory)
                  </th>
                  <th className="p-3 border-r border-gray-200">Course Level</th>
                  <th className="p-3 border-r border-gray-200">
                    Faculty / Dept
                  </th>
                  <th className="p-3 border-r border-gray-200">
                    Programme Name
                  </th>
                  <th className="p-3 border-r border-gray-200">Duration</th>
                  <th className="p-3 border-r border-gray-200">Applied Year</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {proposedFields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '150px' }}
                    >
                      <SelectProgramModeOfEducation
                        label=""
                        defaultOptionText="Select Mode"
                        {...register(
                          `proposedPrograms.${index}.regulatoryModelId` as const
                        )}
                        required
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '150px' }}
                    >
                      <SelectDegreeLevel
                        label=""
                        defaultOptionText="Select Level"
                        {...register(
                          `proposedPrograms.${index}.courseLevelId` as const
                        )}
                        required
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '180px' }}
                    >
                      <SelectDepartment
                        label=""
                        defaultOptionText="Select Dept"
                        {...register(
                          `proposedPrograms.${index}.facultyDeptId` as const
                        )}
                        required
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '200px' }}
                    >
                      <TextBox
                        label=""
                        placeholder="e.g. B.Tech CSE"
                        {...register(
                          `proposedPrograms.${index}.programmeName` as const
                        )}
                        maxLength={200}
                        required
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '130px' }}
                    >
                      <DropDownList
                        data={DURATIONS}
                        textField="name"
                        valueField="id"
                        optionValue="id"
                        label=""
                        placeholder="Select Duration"
                        {...register(
                          `proposedPrograms.${index}.durationYears` as const
                        )}
                        appendTo={document.body}
                      />
                    </td>
                    <td
                      className="p-2 border-r border-gray-200"
                      style={{ minWidth: '130px' }}
                    >
                      <DropDownList
                        data={APPLIED_YEARS}
                        textField="name"
                        valueField="id"
                        optionValue="id"
                        label=""
                        placeholder="Select Year"
                        {...register(
                          `proposedPrograms.${index}.appliedYear` as const
                        )}
                        appendTo={document.body}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <Button
                        icon="trash"
                        variant="outlined"
                        type="button"
                        onClick={() => removeProposed(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </FormCard>

      <FormCard
        title="Human Resources & Student Amenities"
        subtitle="Specify the faculty strength, net qualifications, support staff, and student facilities."
        icon="users"
      >
        <FormGrid columns={2}>
          <TextBox
            label="Teaching Faculty Details (Strength & Qual.)"
            placeholder="e.g. 15 PhDs, 20 NET Qualified"
            {...register('teachingFacultyDetails')}
            maxLength={1000}
            required
          />

          <TextBox
            label="Non-Teaching & Admin Staff Details"
            placeholder="Total count (Admin, Tech, Support)"
            {...register('nonTeachingAdminStaff')}
            maxLength={1000}
            required
          />

          <div className="affiliation-grid-span-2">
            <TextArea
              label="Core Facilities for Students"
              placeholder="Details of Libraries, Labs, Computer Centers, etc."
              rows={4}
              {...register('coreFacilitiesForStudents')}
              required
            />
          </div>
        </FormGrid>
      </FormCard>
    </>
  );
}
