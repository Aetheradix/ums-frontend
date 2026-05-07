import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createUser, getUser, getUsers, updateUser } from './api';

const QUERY_KEY = ['@master/User'];

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
    mutationFn: async (data: Master.UserManagement.UserForm) =>
      await createUser(data),

    onSuccess(data) {
      if (!data) return;
      const result =
        queryClient.getQueryData<Master.UserManagement.UserItem[]>(QUERY_KEY) ??
        [];
      queryClient.setQueryData(QUERY_KEY, [...result, data]);
    },
  });
}

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: async () => {
      const data = await getUser(id);
      if (!data) return undefined;
      return {
        UserName: data.UserName,
        Email: data.Email,
        Password: data.Password,
        PhoneNumber: data.PhoneNumber,
      };
    },
  });
}

export function useUpdateUserMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Master.UserManagement.UserForm) =>
      await updateUser(id, data),

    onSuccess(success, formData) {
      if (!success) return;

      const result =
        queryClient.getQueryData<Master.UserManagement.UserItem[]>(QUERY_KEY) ??
        [];
      const index = result.findIndex(item => item.userId === id);
      if (index === -1) return;

      const itemToReplace: Master.UserManagement.UserItem = {
        userId: id,
        UserName: formData.UserName,
        Email: formData.Email,
        Password: formData.Password,
        PhoneNumber: formData.PhoneNumber,
      };

      queryClient.setQueryData(QUERY_KEY, [
        ...result.slice(0, index),
        itemToReplace,
        ...result.slice(index + 1),
      ]);
      queryClient.setQueryData([...QUERY_KEY, id], formData);
    },
  });
}
