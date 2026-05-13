import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, deleteUser, getUsers, updateUser } from './api';

const QUERY_KEY = ['@master/user-management/users'];

export function useUsersQuery() {
  const { data = [], isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getUsers,
  });

  return { data, isLoading };
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Master.UserManagement.UserForm) => createUser(data),
    onSuccess(data) {
      if (!data) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdateUserMutation(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Master.UserManagement.UserForm) =>
      updateUser(userId, data),
    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess(success) {
      if (!success) return;
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
