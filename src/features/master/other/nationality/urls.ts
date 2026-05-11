export function nationalityUrls(baseUrl: string) {
  const url = `${baseUrl}/nationality`;
  return {
    list: url,
    edit: (id: number) => `${url}/${id}/edit`,
    create: `${url}/create`,
  };
}
