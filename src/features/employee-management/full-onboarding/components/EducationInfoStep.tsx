import { useFieldArray } from 'react-hook-form';
import { NumberBox, TextBox } from 'shared/components/forms';
import { Button } from 'shared/components/buttons';
import { FormCard, FormGrid } from 'shared/new-components';
import SelectDegreeLevel from 'features/components/SelectDegreeLevel';

interface EducationInfoStepProps {
  register: any;
  control: any;
}

export default function EducationInfoStep({
  register,
  control,
}: EducationInfoStepProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'qualifications',
  });

  return (
    <FormCard title="Education Qualifications" icon="book">
      <div className="flex flex-col gap-6">
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded relative bg-gray-50">
            <h4 className="text-sm font-semibold mb-4">
              Qualification {index + 1}
            </h4>
            <FormGrid columns={3}>
              <SelectDegreeLevel
                label="Qualification Level"
                {...register(`qualifications.${index}.qualificationId`)}
                required
              />
              <TextBox
                label="University"
                placeholder="Enter University Name"
                {...register(`qualifications.${index}.university`)}
                maxLength={200}
              />
              <TextBox
                label="Board"
                placeholder="Enter Board Name"
                {...register(`qualifications.${index}.board`)}
                maxLength={200}
              />
              <NumberBox
                label="Year of Passing"
                placeholder="YYYY"
                {...register(`qualifications.${index}.yearOfPassing`)}
                min={1950}
                max={new Date().getFullYear()}
                useGrouping={false}
              />
              <NumberBox
                label="Percentage"
                placeholder="Enter Percentage"
                {...register(`qualifications.${index}.percentage`)}
                min={0}
                max={100}
              />
              <TextBox
                label="Grade"
                placeholder="Enter Grade (e.g., A+)"
                {...register(`qualifications.${index}.grade`)}
                maxLength={10}
              />
            </FormGrid>
            {fields.length > 1 && (
              <Button
                label="Remove"
                icon="trash"
                variant="danger"
                className="absolute top-2 right-2"
                onClick={() => remove(index)}
              />
            )}
          </div>
        ))}

        <div>
          <Button
            label="Add Qualification"
            icon="plus"
            variant="outlined"
            onClick={() =>
              append({
                qualificationId: '',
                university: '',
                board: '',
                yearOfPassing: '',
                percentage: '',
                grade: '',
              })
            }
          />
        </div>
      </div>
    </FormCard>
  );
}
