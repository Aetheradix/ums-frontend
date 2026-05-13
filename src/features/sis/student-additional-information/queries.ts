import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createStudentAdditionalInformation,
  getStudentAdditionalInformations,
  getStudentAdditionalInformation,
  updateStudentAdditionalInformation,
} from './api';

const QUERY_KEY = ['@sis/student-additional-information'];

export function useStudentAdditionalInformationsQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getStudentAdditionalInformations,
  });

  return { data, isLoading };
}

export function useCreateStudentAdditionalInformationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SIS.StudentAdditionalInformationForm) =>
      await createStudentAdditionalInformation(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<SIS.StudentAdditionalInformationItem[]>(
          QUERY_KEY
        ) ?? [];

      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useStudentAdditionalInformationQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getStudentAdditionalInformation(id);
      if (!data) return undefined;

      return {
        studentId: data.studentId,
        studentAcademicId: data.studentAcademicId,
        documentType: data.documentType,
        emergencyContactName: data.emergencyContactName,
        emergencyContact: data.emergencyContact,
        emergencyRelation: data.emergencyRelation,
        emailNotification: data.emailNotification,
        smsNotification: data.smsNotification,
        pushNotification: data.pushNotification,
        languagePreferance: data.languagePreferance,
        profilePhoto: null, // Files cannot be fetched as File objects easily here
      };
    },
    enabled: !!id,
  });
}

export function useUpdateStudentAdditionalInformationMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SIS.StudentAdditionalInformationForm) =>
      await updateStudentAdditionalInformation(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<SIS.StudentAdditionalInformationItem[]>(
          QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: SIS.StudentAdditionalInformationItem = {
        id,
        studentId: formData.studentId,
        studentAcademicId: formData.studentAcademicId,
        documentType: formData.documentType,
        emergencyContactName: formData.emergencyContactName,
        emergencyContact: formData.emergencyContact,
        emergencyRelation: formData.emergencyRelation,
        emailNotification: formData.emailNotification,
        smsNotification: formData.smsNotification,
        pushNotification: formData.pushNotification,
        languagePreferance: formData.languagePreferance,
        profilePhotoUrl: existing?.profilePhotoUrl, // Keep existing URL if any
      };

      const updatedItems = [
        ...result.slice(0, index),
        itemToReplace,
        ...result.slice(index + 1),
      ];

      queryClient.setQueryData(QUERY_KEY, updatedItems);
      queryClient.setQueryData([...QUERY_KEY, id], formData);
    },
  });
}
