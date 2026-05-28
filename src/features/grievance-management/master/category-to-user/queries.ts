import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from './api';

export function useCategoryToUserMappingQuery() {
  return useQuery({
    queryKey: ['category-to-user-mapping'],
    queryFn: api.getCategoryToUserMappings,
  });
}

export function useCategoryToUserMappingByPolicyQuery(
  categoryId: number,
  userId: string
) {
  return useQuery({
    queryKey: ['category-to-user-mapping', categoryId, userId],
    queryFn: () => api.getCategoryToUserMappingByPolicy(categoryId, userId),
    enabled: !!categoryId && !!userId,
  });
}

export function useCreateCategoryToUserMappingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.createCategoryToUserMapping,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category-to-user-mapping'],
        exact: true,
      });
    },
  });
}

export function useUpdateCategoryToUserMappingMutation(
  oldPolicy: Grievance.CategoryToUserMapping
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Grievance.CategoryToUserMappingForm) =>
      api.updateCategoryToUserMapping(oldPolicy, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['category-to-user-mapping'],
        exact: true,
      });
    },
  });
}
