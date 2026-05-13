import { useState } from 'react';
import { useUsersQuery } from '../../user/queries';
import { useRolesQuery } from '../../role/queries';
import {
  useUserRoleMappingsQuery,
  useAddUserRoleMappingMutation,
  useRemoveUserRoleMappingMutation,
} from '../queries';

export function useUserRoleMapping() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const { data: users, isLoading: isUsersLoading } = useUsersQuery();
  const { data: roles, isLoading: isRolesLoading } = useRolesQuery();
  const { data: mappings, isLoading: isMappingsLoading } =
    useUserRoleMappingsQuery();

  const addMappingMutation = useAddUserRoleMappingMutation();
  const removeMappingMutation = useRemoveUserRoleMappingMutation();

  const userOptions = (users || []).map(u => ({
    label: u.userName,
    value: u.id,
  }));
  const roleOptions = (roles || []).map(r => ({
    label: r.name,
    value: r.name,
  }));

  const currentRolesObj = (mappings || [])
    .filter(m => m.userId === selectedUserId)
    .reduce(
      (acc, m) => {
        acc[m.roleName] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );

  const handleRoleToggle = async (roleName: string, checked: boolean) => {
    if (!selectedUserId) return;

    if (checked) {
      await addMappingMutation.mutateAsync({
        userId: selectedUserId,
        roleName,
      });
    } else {
      await removeMappingMutation.mutateAsync({
        userId: selectedUserId,
        roleName,
      });
    }
  };

  const isLoading = isUsersLoading || isRolesLoading || isMappingsLoading;

  return {
    selectedUserId,
    setSelectedUserId,
    userOptions,
    roleOptions,
    currentRolesObj,
    handleRoleToggle,
    isLoading,
  };
}
