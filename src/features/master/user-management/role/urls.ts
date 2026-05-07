export function roleUrls(baseUrl: string) {
  const url = `${baseUrl}/roles`;
  return {
    root: url,
    edit: (id: string) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
