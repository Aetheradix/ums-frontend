import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSchemeType,
  deleteSchemeType,
  getSchemeTypes,
  getSchemeType,
  patchSchemeTypeStatus,
  updateSchemeType,
  createSchemeCategory,
  deleteSchemeCategory,
  getSchemeCategories,
  getSchemeCategory,
  patchSchemeCategoryStatus,
  updateSchemeCategory,
} from './api';

const SCHEME_TYPE_QUERY_KEY = ['@master/scheme-type'];
const SCHEME_CATEGORY_QUERY_KEY = ['@master/scheme-category'];

// Scheme Type Queries
export function useSchemeTypesQuery() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: SCHEME_TYPE_QUERY_KEY,
    queryFn: getSchemeTypes,
  });

  return { data, isLoading, refetch };
}

export function useCreateSchemeTypeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.Scheme.SchemeTypeForm) =>
      await createSchemeType(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeTypeItem[]>(
          SCHEME_TYPE_QUERY_KEY
        ) ?? [];

      queryClient.setQueryData(SCHEME_TYPE_QUERY_KEY, [...result, data]);
    },
  });
}

export function useSchemeTypeQuery(id: number) {
  return useQuery({
    queryKey: [...SCHEME_TYPE_QUERY_KEY, id],
    queryFn: async () => {
      const data = await getSchemeType(id);
      if (!data) return undefined;

      return {
        name: data.name,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateSchemeTypeMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.Scheme.SchemeTypeForm) =>
      await updateSchemeType(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeTypeItem[]>(
          SCHEME_TYPE_QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: Master.Scheme.SchemeTypeItem = {
        id,
        name: formData.name,
        isActive: existing?.isActive ?? true,
      };

      const updatedItems = [
        ...result.slice(0, index),
        itemToReplace,
        ...result.slice(index + 1),
      ];

      queryClient.setQueryData(SCHEME_TYPE_QUERY_KEY, updatedItems);
      queryClient.setQueryData([...SCHEME_TYPE_QUERY_KEY, id], formData);
    },
  });
}

export function useDeleteSchemeTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteSchemeType(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeTypeItem[]>(
          SCHEME_TYPE_QUERY_KEY
        ) ?? [];

      const updatedItems = result.filter(item => item.id !== id);

      queryClient.setQueryData(SCHEME_TYPE_QUERY_KEY, updatedItems);
    },
  });
}

export function useSchemeTypeActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchSchemeTypeStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeTypeItem[]>(
          SCHEME_TYPE_QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === variables.id);
      if (index === -1) return;

      const updatedItem = {
        ...result[index],
        isActive: variables.isActive,
      };

      queryClient.setQueryData(SCHEME_TYPE_QUERY_KEY, [
        ...result.slice(0, index),
        updatedItem,
        ...result.slice(index + 1),
      ]);
    },
  });
}

// Scheme Category Queries
export function useSchemesCategoriesQuery() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: SCHEME_CATEGORY_QUERY_KEY,
    queryFn: getSchemeCategories,
  });

  return { data, isLoading, refetch };
}

export function useCreateSchemeCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Master.Scheme.SchemeCategoryForm) =>
      await createSchemeCategory(data),

    onSuccess(data) {
      if (!data) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeCategoryItem[]>(
          SCHEME_CATEGORY_QUERY_KEY
        ) ?? [];

      queryClient.setQueryData(SCHEME_CATEGORY_QUERY_KEY, [...result, data]);
    },
  });
}

export function useSchemeCategoryQuery(id: number) {
  return useQuery({
    queryKey: [...SCHEME_CATEGORY_QUERY_KEY, id],
    queryFn: async () => {
      const data = await getSchemeCategory(id);
      if (!data) return undefined;

      return {
        name: data.name,
        schemeTypeId: data.schemeTypeId,
        isActive: data.isActive,
      };
    },
  });
}

export function useUpdateSchemeCategoryMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.Scheme.SchemeCategoryForm) =>
      await updateSchemeCategory(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeCategoryItem[]>(
          SCHEME_CATEGORY_QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: Master.Scheme.SchemeCategoryItem = {
        id,
        name: formData.name,
        schemeTypeId: formData.schemeTypeId,
        isActive: existing?.isActive ?? true,
      };

      const updatedItems = [
        ...result.slice(0, index),
        itemToReplace,
        ...result.slice(index + 1),
      ];

      queryClient.setQueryData(SCHEME_CATEGORY_QUERY_KEY, updatedItems);
      queryClient.setQueryData([...SCHEME_CATEGORY_QUERY_KEY, id], formData);
    },
  });
}

export function useDeleteSchemeCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteSchemeCategory(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeCategoryItem[]>(
          SCHEME_CATEGORY_QUERY_KEY
        ) ?? [];

      const updatedItems = result.filter(item => item.id !== id);

      queryClient.setQueryData(SCHEME_CATEGORY_QUERY_KEY, updatedItems);
    },
  });
}

export function useSchemeCategoryActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchSchemeCategoryStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.Scheme.SchemeCategoryItem[]>(
          SCHEME_CATEGORY_QUERY_KEY
        ) ?? [];

      const index = result.findIndex(item => item.id === variables.id);
      if (index === -1) return;

      const updatedItem = {
        ...result[index],
        isActive: variables.isActive,
      };

      queryClient.setQueryData(SCHEME_CATEGORY_QUERY_KEY, [
        ...result.slice(0, index),
        updatedItem,
        ...result.slice(index + 1),
      ]);
    },
  });
}
