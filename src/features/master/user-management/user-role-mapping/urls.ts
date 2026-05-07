export function userRoleMappingUrls(baseUrl: string) {
  const url = `${baseUrl}/user-role-mappings`;
  return {
    root: url,
    edit: (id: number) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
