import { useState } from 'react';
import { useRolesQuery } from '../../role/queries';
import {
  useAddRoleFeatureMappingMutation,
  useRemoveRoleFeatureMappingMutation,
  useRoleFeatureMappingsQuery,
} from '../queries';

export function useRoleFeatureMapping() {
  const [selectedRoleName, setSelectedRoleName] = useState<string | null>(null);
  const [newFeature, setNewFeature] = useState({ name: '', action: 'read' });

  const { data: roles, isLoading: isRolesLoading } = useRolesQuery();
  const { data: mappings, isLoading: isMappingsLoading } =
    useRoleFeatureMappingsQuery();

  const addMappingMutation = useAddRoleFeatureMappingMutation();
  const removeMappingMutation = useRemoveRoleFeatureMappingMutation();

  const roleOptions = (roles || []).map(r => ({
    label: r.name,
    value: r.name,
  }));

  const currentFeatures = (mappings || []).filter(
    m => m.roleName === selectedRoleName
  );

  const handleAdd = async () => {
    if (!selectedRoleName || !newFeature.name) return;
    await addMappingMutation.mutateAsync({
      roleName: selectedRoleName,
      featureName: newFeature.name,
      action: newFeature.action,
    });
    setNewFeature({ name: '', action: 'read' });
  };

  const handleRemove = async (featureName: string, action: string) => {
    if (!selectedRoleName) return;
    await removeMappingMutation.mutateAsync({
      roleName: selectedRoleName,
      featureName,
      action,
    });
  };

  const isLoading = isRolesLoading || isMappingsLoading;

  return {
    selectedRoleName,
    setSelectedRoleName,
    newFeature,
    setNewFeature,
    roleOptions,
    currentFeatures,
    handleAdd,
    handleRemove,
    isLoading,
  };
}
