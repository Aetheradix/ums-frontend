import type { Control } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from 'shared/components/buttons';
import { FormCard, FormGrid } from 'shared/new-components';
import SelectProgramme from 'features/components/SelectProgramme';
import { MultiSelectList } from 'shared/components/forms';
import { ToastService } from 'services';
import { useProgrammesQuery } from 'features/master/other/programme/queries';
import { useSubjectsQuery } from 'features/master/subject/subjects/queries';

interface CollegeCourseDetailStepProps {
  control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
}

// Helper to determine static/dynamic fees based on selected course name
const getCourseFees = (courseId: number, courseName: string) => {
  if (!courseId) {
    return {
      affiliationFee: 0,
      inspectionFee: 0,
      fdAmount: 0,
      courseType: '',
      courseCode: '',
    };
  }

  const name = courseName.toUpperCase();
  if (name.includes('B.COM') || name.includes('BCOM')) {
    return {
      affiliationFee: 25000,
      inspectionFee: 5000,
      fdAmount: 50000,
      courseType: 'TEMPORARY',
      courseCode: 'BCOM',
    };
  } else if (name.includes('B.SC') || name.includes('BSC')) {
    return {
      affiliationFee: 30000,
      inspectionFee: 7000,
      fdAmount: 300000,
      courseType: 'TEMPORARY',
      courseCode: 'BSC',
    };
  } else {
    return {
      affiliationFee: 20000,
      inspectionFee: 4000,
      fdAmount: 40000,
      courseType: 'TEMPORARY',
      courseCode: name || 'OTHER',
    };
  }
};

export default function CollegeCourseDetailStep({
  control,
}: CollegeCourseDetailStepProps) {
  // Use React Hook Form's useFieldArray to manage the courses list dynamically
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'courses',
  });

  // Local form state for Course & Multi-Select Subject selection dropdowns
  const {
    watch: localWatch,
    reset: localReset,
    control: localControl,
  } = useForm({
    defaultValues: {
      tempCourseId: '',
      tempSubjects: [] as Master.SubjectMaster.SubjectItem[], // selected subjects array
    },
  });

  const tempCourseId = localWatch('tempCourseId');
  const tempSubjects = localWatch('tempSubjects');

  // Load programs and subjects to display names in the summary table
  const { data: programmes } = useProgrammesQuery();
  const { data: subjects } = useSubjectsQuery();

  const activeSubjects =
    (subjects as Master.SubjectMaster.SubjectItem[])?.filter(
      item => item.isActive
    ) || [];

  const selectedCourse = (programmes as Master.Other.ProgrammeItem[])?.find(
    p => p.id === Number(tempCourseId)
  );
  const currentFees = getCourseFees(
    Number(tempCourseId),
    selectedCourse?.name || ''
  );

  const handleAddCourse = () => {
    if (!tempCourseId || !tempSubjects || tempSubjects.length === 0) {
      ToastService.error('Please select both Course and at least one Subject.');
      return;
    }

    const cId = Number(tempCourseId);

    // Filter out subjects that are already added for this course
    const newSubjects = tempSubjects.filter(
      (subj: Master.SubjectMaster.SubjectItem) => {
        const mappingId = cId * 10000 + Number(subj.id);
        return !fields.some(f => f.programmeFeesMappingId === mappingId);
      }
    );

    if (newSubjects.length === 0) {
      ToastService.error(
        'All selected subjects for this course have already been added.'
      );
      return;
    }

    newSubjects.forEach((subj: Master.SubjectMaster.SubjectItem) => {
      const mappingId = cId * 10000 + Number(subj.id);
      append({
        programmeFeesMappingId: mappingId,
        totalAmount:
          currentFees.affiliationFee +
          currentFees.inspectionFee +
          currentFees.fdAmount,
        isFeePaid: false,
        paymentDate: '',
      });
    });

    ToastService.success(
      `Added ${newSubjects.length} subject(s) to the course.`
    );

    // Reset dropdown values
    localReset({
      tempCourseId: '',
      tempSubjects: [],
    });
  };

  const handleRemoveGroup = (indices: number[]) => {
    // Sort indices in descending order to avoid shifting issues when deleting
    const sorted = [...indices].sort((a, b) => b - a);
    sorted.forEach(idx => remove(idx));
    ToastService.success('Course selection removed successfully.');
  };

  // Group fields by courseId for tabular rendering
  const grouped: Record<
    number,
    {
      courseId: number;
      items: typeof fields;
      indices: number[];
    }
  > = {};

  fields.forEach((field, index) => {
    const courseId = Math.floor(field.programmeFeesMappingId / 10000);
    if (!grouped[courseId]) {
      grouped[courseId] = {
        courseId,
        items: [],
        indices: [],
      };
    }
    grouped[courseId].items.push(field);
    grouped[courseId].indices.push(index);
  });

  const groupedRows = Object.values(grouped);

  return (
    <div className="flex flex-col gap-6">
      <FormCard title="Course Details" icon="book">
        <FormGrid columns={2}>
          <SelectProgramme
            label="Course"
            defaultOptionText="Select Course"
            control={localControl}
            name="tempCourseId"
            required
          />
          <div>
            <MultiSelectList
              label="Subject"
              control={localControl}
              name="tempSubjects"
              data={activeSubjects}
              textField="subjectName"
              required
            />
            <span className="text-xs text-red-500 block mt-1.5 font-medium">
              (In case of no subject, select PLAIN.)
            </span>
          </div>
        </FormGrid>

        {/* Fees Information Panels */}
        {tempCourseId && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-6 bg-slate-50/80 border border-slate-100 rounded-xl">
            {/* Box 1: Affiliation Fee */}
            <div className="flex flex-col gap-2 p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <span className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-1.5">
                Affiliation Fee
              </span>
              <span className="text-xs text-slate-500 font-medium leading-relaxed">
                Affiliation fee for new courses (including 1 Foundation Course
                subject):{' '}
                <strong className="text-slate-800">
                  {currentFees.affiliationFee}
                </strong>{' '}
                /-
              </span>
              <span className="text-xs text-slate-500 font-medium leading-relaxed">
                Affiliation fee for additional subjects:{' '}
                <strong className="text-slate-800">25000</strong> /- per subject
              </span>
            </div>
            {/* Box 2: Inspection Fee */}
            <div className="flex flex-col gap-2 p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <span className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-1.5">
                Inspection fee
              </span>
              <span className="text-xs text-slate-500 font-medium leading-relaxed">
                Inspection fee for new courses (including 1 Foundation Course
                subject):{' '}
                <strong className="text-slate-800">
                  {currentFees.inspectionFee}
                </strong>{' '}
                /-
              </span>
              <span className="text-xs text-slate-500 font-medium leading-relaxed">
                Inspection fee for additional subjects:{' '}
                <strong className="text-slate-800">0</strong> /- per subject
              </span>
            </div>
            {/* Box 3: FD Amount */}
            <div className="flex flex-col gap-2 p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <span className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-1.5">
                FD Amount
              </span>
              <span className="text-xs text-slate-500 font-medium leading-relaxed">
                An FD of <strong className="text-slate-800">0</strong> /- will
                be payable for new courses.
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <Button
            label="Add course"
            icon="plus"
            variant="primary"
            onClick={handleAddCourse}
          />
        </div>
      </FormCard>

      {/* Grouped Courses Table */}
      {fields.length > 0 && (
        <FormCard title="Selected Courses List" icon="list">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-sky-100/50">
                  <th className="border-b border-gray-200 px-4 py-3 text-center w-24 text-sky-800 font-bold"></th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left w-16 text-sky-800 font-bold">
                    S.No
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-sky-800 font-bold">
                    Course Type
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-sky-800 font-bold">
                    Course
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-sky-800 font-bold">
                    Branch
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-sky-800 font-bold">
                    FD Amount
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-sky-800 font-bold">
                    Affiliation Fee
                  </th>
                  <th className="border-b border-gray-200 px-4 py-3 text-left text-sky-800 font-bold">
                    Inspection Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupedRows.map((row, rowIndex) => {
                  const courseName =
                    (programmes as Master.Other.ProgrammeItem[])?.find(
                      p => p.id === row.courseId
                    )?.name ?? `Course #${row.courseId}`;
                  const fees = getCourseFees(row.courseId, courseName);

                  const subjectNames = row.items
                    .map(item => {
                      const sId = item.programmeFeesMappingId % 10000;
                      return (
                        (subjects as Master.SubjectMaster.SubjectItem[])?.find(
                          s => s.id === sId
                        )?.subjectName ?? `Subject #${sId}`
                      );
                    })
                    .filter(Boolean)
                    .join(', ');

                  return (
                    <tr
                      key={row.courseId}
                      className="hover:bg-gray-50 border-b border-gray-150"
                    >
                      <td className="px-4 py-3 text-center">
                        <Button
                          label="Delete"
                          variant="text"
                          className="text-danger font-semibold p-0 hover:underline text-[14px]"
                          onClick={() => handleRemoveGroup(row.indices)}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {rowIndex + 1}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                        {fees.courseType}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-800 font-bold">
                        {fees.courseCode}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs break-words">
                        {subjectNames}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-semibold">
                        {fees.fdAmount}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-semibold">
                        {fees.affiliationFee}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700 font-semibold">
                        {fees.inspectionFee}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FormCard>
      )}
    </div>
  );
}
