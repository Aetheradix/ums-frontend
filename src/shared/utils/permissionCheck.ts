export function hasPermission(
  permissions: Record<string, string[]>,
  feature?: string,
  action?: string
) {
  if (!feature || !action) return true; // public menu
  return permissions?.[feature]?.includes(action);
}
