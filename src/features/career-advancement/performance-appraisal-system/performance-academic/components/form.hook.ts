import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 100 * 1024; // 100KB

const performanceAcademicSchema = z.object({
  academicId: z.number().optional(),
  qualificationId: z.number().min(1, 'Highest qualification is required'),
  universityInstitution: z
    .string()
    .min(1, 'University / Institution is required'),
  yearOfPassing: z
    .string()
    .min(4, 'Year is required')
    .max(4, 'Year must be 4 digits')
    .regex(/^\d{4}$/, 'Must be a valid year (YYYY)'),
  netsetQualified: z.enum(['Yes', 'No']),
  document: z
    .any()
    .refine(file => file instanceof File, 'Document is required')
    .refine(
      file => !file || file.size <= MAX_FILE_SIZE,
      'Max file size is 100KB'
    ),
  otherDocument: z
    .any()
    .optional()
    .refine(file => !file || file instanceof File, 'Must be a file')
    .refine(
      file => !file || file.size <= MAX_FILE_SIZE,
      'Max file size is 100KB'
    ),
});

type PerformanceAcademicFormSchema = z.infer<typeof performanceAcademicSchema>;

export const usePerformanceAcademicForm = (
  onSubmit: (data: CareerAdvancement.PerformanceAcademicForm) => void,
  initialData?: Partial<CareerAdvancement.PerformanceAcademicForm>
) => {
  const { register, handleSubmit, control } =
    useForm<PerformanceAcademicFormSchema>({
      resolver: zodResolver(performanceAcademicSchema),
      defaultValues: {
        qualificationId: initialData?.qualificationId || 0,
        universityInstitution: initialData?.universityInstitution || '',
        yearOfPassing: initialData?.yearOfPassing || '',
        netsetQualified: initialData?.netsetQualified || undefined,
        document: initialData?.document as unknown as File,
        otherDocument: initialData?.otherDocument as unknown as File,
        academicId: initialData?.academicId,
      },
    });

  return {
    register,
    control,
    handleSubmit: handleSubmit(data =>
      onSubmit(data as unknown as CareerAdvancement.PerformanceAcademicForm)
    ),
  };
};
