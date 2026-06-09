export function hasPermission(
  permissions: Record<string, string[]>,
  feature?: string,
  action?: string
) {
  if (!feature || !action) return true; // public menu

  if (!permissions) return false;

  const featureKey = Object.keys(permissions).find(
    key => key.toLowerCase() === feature.toLowerCase()
  );

  if (!featureKey) return false;

  return permissions[featureKey].some(
    permittedAction => permittedAction.toLowerCase() === action.toLowerCase()
  );
}
