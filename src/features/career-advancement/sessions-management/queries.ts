import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSession,
  deleteSession,
  getSessionById,
  getSessions,
  patchSessionStatus,
  updateSession,
} from './api';
import type {
  CreateSessionCommand,
  SessionResponseDto,
  UpdateSessionCommand,
} from './types';

const QUERY_KEY = ['@career-advancement/sessions'];

export function useSessionsQuery() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getSessions,
  });

  return { data, isLoading, refetch };
}

export function useCreateSessionMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateSessionCommand) => await createSession(data),

    onSuccess(data, variables) {
      if (!data) return;

      const result =
        queryClient.getQueryData<SessionResponseDto[]>(QUERY_KEY) ?? [];

      const newId =
        (data as any).value ??
        (data as any).id ??
        Math.max(0, ...result.map(x => x.id)) + 1;

      const newItem: SessionResponseDto = {
        id: newId,
        sessionName: variables.sessionName,
        sessionType: variables.sessionType,
        startDateTime: variables.startDateTime,
        endDateTime: variables.endDateTime,
        appStatus: variables.appStatus,
        sessionFrom: variables.sessionFrom,
        sessionTo: variables.sessionTo,
        isActive: true,
        createdOn: new Date().toISOString(),
        createdBy: '',
        ipAddress: '',
        ...(typeof data === 'object' ? data : {}),
      };

      queryClient.setQueryData(QUERY_KEY, [...result, newItem]);
    },
  });
}

export function useSessionQuery(id: number) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getSessionById(id);
      if (!data) return undefined;

      return {
        sessionName: data.sessionName,
        sessionType: data.sessionType,
        startDateTime: data.startDateTime ? new Date(data.startDateTime) : null,
        endDateTime: data.endDateTime ? new Date(data.endDateTime) : null,
        appStatus: data.appStatus,
        sessionFrom: data.sessionFrom ? new Date(data.sessionFrom) : null,
        sessionTo: data.sessionTo ? new Date(data.sessionTo) : null,
      };
    },
  });
}

export function useUpdateSessionMutation(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSessionCommand) =>
      await updateSession(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<SessionResponseDto[]>(QUERY_KEY) ?? [];

      const index = result.findIndex(item => item.id === id);
      if (index === -1) return;

      const existing = result[index];

      const itemToReplace: SessionResponseDto = {
        id,
        sessionName: formData.sessionName,
        sessionType: formData.sessionType,
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
        appStatus: formData.appStatus,
        sessionFrom: formData.sessionFrom,
        sessionTo: formData.sessionTo,
        isActive: existing?.isActive ?? true,
        createdOn: existing?.createdOn ?? new Date().toISOString(),
        createdBy: existing?.createdBy ?? '',
        ipAddress: existing?.ipAddress ?? '',
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

export function useDeleteSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteSession(id),

    onSuccess(success, id) {
      if (!success) return;

      const result =
        queryClient.getQueryData<SessionResponseDto[]>(QUERY_KEY) ?? [];

      const updatedItems = result.filter(item => item.id !== id);

      queryClient.setQueryData(QUERY_KEY, updatedItems);
    },
  });
}

export function useSessionActiveStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; isActive: boolean }) =>
      await patchSessionStatus(data.id),

    onSuccess(success, variables) {
      if (!success) return;

      const result =
        queryClient.getQueryData<SessionResponseDto[]>(QUERY_KEY) ?? [];

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
