import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createProgrammeFee,
  getProgrammeFee,
  getProgrammeFees,
  patchProgrammeFeeStatus,
  updateProgrammeFee,
} from './api';

const QUERY_KEY = ['@master/programme-fee'];

export function useProgrammeFeesQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getProgrammeFees,
  });

  return { data, isLoading };
}

export function useProgrammeFeeQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getProgrammeFee(id);
      if (!data) return undefined;

      return {
        programmeId: data.programmeId,
        programmeName: data.programmeName,
        fixedDepositAmount: data.fixedDepositAmount,
        affiliationFee: data.affiliationFee,
        inspectionFee: data.inspectionFee,
        otherFee: data.otherFee,
        isActive: data.isActive,
      };
    },
  });
}

export function useCreateProgrammeFeeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AffiliationMaster.ProgrammeFeeForm) =>
      await createProgrammeFee(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<AffiliationMaster.ProgrammeFeeItem[]>(
          QUERY_KEY
        ) ?? [];

      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useUpdateProgrammeFeeMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AffiliationMaster.ProgrammeFeeForm) =>
      await updateProgrammeFee(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<AffiliationMaster.ProgrammeFeeItem[]>(
          QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: AffiliationMaster.ProgrammeFeeItem = {
        id,
        programmeId: existing.programmeId,
        programmeName: formData.programmeName,
        fixedDepositAmount: formData.fixedDepositAmount,
        affiliationFee: formData.affiliationFee,
        inspectionFee: formData.inspectionFee,
        otherFee: formData.otherFee,
        isActive: existing?.isActive ?? formData.isActive,
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

export function useProgrammeFeeActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchProgrammeFeeStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<AffiliationMaster.ProgrammeFeeItem[]>(
          QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === variables.id);
      if (index === -1) return;

      const updatedItem = {
        ...result[index],
        isActive: variables.isActive,
      };

      queryClient.setQueryData(QUERY_KEY, [
        ...result.slice(0, index),
        updatedItem,
        ...result.slice(index + 1),
      ]);
    },
  });
}
