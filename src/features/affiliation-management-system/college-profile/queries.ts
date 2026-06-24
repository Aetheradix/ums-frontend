import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { saveCollegeProfile, getCollegeProfile } from './api';

const QUERY_KEY = ['@affiliation/college-profile'];

export function useCollegeProfileQuery(applicationNo: string, enabled = false) {
  return useQuery({
    queryKey: [...QUERY_KEY, applicationNo],
    queryFn: async () => {
      if (!applicationNo) return undefined;
      return await getCollegeProfile(applicationNo);
    },
    enabled: enabled && !!applicationNo,
  });
}

export function useSaveCollegeProfileMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      data: AffiliationManagementSystem.CollegeProfileWizardData
    ) => await saveCollegeProfile(data),

    onSuccess(data, variables) {
      if (!data) return;
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY, variables.applicationNo],
      });
    },
  });
}
