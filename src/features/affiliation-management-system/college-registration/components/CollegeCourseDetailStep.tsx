import { useProgrammeFeesQuery } from 'features/affiliation-management-system/settings/programme-fee/queries';
import SelectProgramme from 'features/components/SelectProgramme';
import { useProgrammesQuery } from 'features/master/other/programme/queries';
import { useSubjectsQuery } from 'features/master/subject/subjects/queries';
import type { Control } from 'react-hook-form';
import { useFieldArray, useForm } from 'react-hook-form';
import { ToastService } from 'services';
import { Button } from 'shared/components/buttons';
import { MultiSelectList } from 'shared/components/forms';
import { FormCard, FormGrid } from 'shared/new-components';

interface CollegeCourseDetailStepProps {
  control: Control<AffiliationManagementSystem.CollegeApplicationFormData>;
}

// Helper to determine fees dynamically based on selected course from ProgrammeFee master
const getCourseFees = (
  courseId: number,
  courseName: string,
  programmeFees: AffiliationManagementSystem.ProgrammeFeeItem[],
  programmes: Master.Other.ProgrammeItem[]
) => {
  if (!courseId) {
    return {
      affiliationFee: 0,
      inspectionFee: 0,
      fdAmount: 0,
      courseType: '',
      courseCode: '',
    };
  }

  const selectedProgramme = programmes?.find(p => p.id === courseId);
  const fee = programmeFees?.find(f => f.programmeId === courseId);

  return {
    programmeFeeId: fee?.programmeFeeId || 0,
    affiliationFee: fee?.affiliationFee || 0,
    inspectionFee: fee?.inspectionFee || 0,
    fdAmount: fee?.fixedDepositAmount || 0,
    courseType: selectedProgramme?.degreeLevelName || 'TEMPORARY',
    courseCode: courseName || 'OTHER',
  };
};

export default function CollegeCourseDetailStep({
  control,
}: CollegeCourseDetailStepProps) {
  const { fields, append, remove, update } = useFieldArray({
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

  // Load programs, subjects, and programme fees
  const { data: programmesRaw } = useProgrammesQuery();
  const { data: subjectsRaw } = useSubjectsQuery();
  const { data: programmeFeesRaw } = useProgrammeFeesQuery();

  const programmes = (programmesRaw || []) as Master.Other.ProgrammeItem[];
  const subjects = (subjectsRaw || []) as Master.SubjectMaster.SubjectItem[];
  const programmeFeesData = (programmeFeesRaw ||
    []) as AffiliationManagementSystem.ProgrammeFeeItem[];

  const activeSubjects = subjects.filter(item => item.isActive);

  const activeProgrammeFees = programmeFeesData.filter(item => item.isActive);

  const selectedCourse = programmes.find(p => p.id === Number(tempCourseId));
  const currentFees = getCourseFees(
    Number(tempCourseId),
    selectedCourse?.name || '',
    activeProgrammeFees,
    programmes
  );

  const handleAddCourse = () => {
    if (!tempCourseId || !tempSubjects || tempSubjects.length === 0) {
      ToastService.error('Please select both Course and at least one Subject.');
      return;
    }

    const cId = Number(tempCourseId);
    const existingCourseIndex = fields.findIndex(f => f.courseId === cId);
    const newSubjectIds = tempSubjects.map((s: any) => Number(s.id));

    if (existingCourseIndex >= 0) {
      const existingField = fields[existingCourseIndex];
      const existingSubjectIds = existingField.subjectIds || [];
      const subjectsToAdd = newSubjectIds.filter(
        id => !existingSubjectIds.includes(id)
      );

      if (subjectsToAdd.length === 0) {
        ToastService.error(
          'All selected subjects for this course have already been added.'
        );
        return;
      }

      update(existingCourseIndex, {
        ...existingField,
        subjectIds: [...existingSubjectIds, ...subjectsToAdd],
      });

      ToastService.success(
        `Added ${subjectsToAdd.length} new subject(s) to the existing course.`
      );
    } else {
      append({
        courseId: cId,
        subjectIds: newSubjectIds,
        totalAmount:
          currentFees.affiliationFee +
          currentFees.inspectionFee +
          currentFees.fdAmount,
        isFeePaid: false,
        paymentDate: '',
      });

      ToastService.success(
        `Added course with ${newSubjectIds.length} subject(s).`
      );
    }

    localReset({
      tempCourseId: '',
      tempSubjects: [],
    });
  };

  const handleRemoveCourse = (index: number) => {
    remove(index);
    ToastService.success('Course selection removed successfully.');
  };

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
              label="Subjects"
              control={localControl}
              name="tempSubjects"
              data={activeSubjects}
              textField="subjectName"
              placeholder="Select Subjects"
              required
            />
          </div>
        </FormGrid>

        {tempCourseId && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-6 bg-slate-50/80 border border-slate-100 rounded-xl">
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
            </div>
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
            </div>
            {/* Box 3: FD Amount */}
            <div className="flex flex-col gap-2 p-4 bg-white border border-slate-100 rounded-lg shadow-sm">
              <span className="text-sm font-bold text-slate-700 border-b border-slate-100 pb-1.5">
                FD Amount
              </span>
              <span className="text-xs text-slate-500 font-medium leading-relaxed">
                An FD of{' '}
                <strong className="text-slate-800">
                  {currentFees.fdAmount}
                </strong>{' '}
                /- will be payable for new courses.
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
                    Subjects
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
                {fields.map((field, rowIndex) => {
                  const courseName =
                    programmes.find(p => p.id === field.courseId)?.name ??
                    `Course #${field.courseId}`;
                  const fees = getCourseFees(
                    field.courseId!,
                    courseName,
                    activeProgrammeFees,
                    programmes
                  );

                  const subjectNames = (field.subjectIds || [])
                    .map(sId => {
                      return (
                        subjects.find(s => s.id === sId)?.subjectName ??
                        `Subject #${sId}`
                      );
                    })
                    .filter(Boolean)
                    .join(', ');

                  return (
                    <tr
                      key={field.id}
                      className="hover:bg-gray-50 border-b border-gray-150"
                    >
                      <td className="px-4 py-3 text-center">
                        <Button
                          label="Delete"
                          variant="text"
                          className="text-danger font-semibold p-0 hover:underline text-[14px]"
                          onClick={() => handleRemoveCourse(rowIndex)}
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
