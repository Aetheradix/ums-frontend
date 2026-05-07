export function userUrls(baseUrl: string) {
  const url = `${baseUrl}/users`;
  return {
    root: url,
    edit: (id: string) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
