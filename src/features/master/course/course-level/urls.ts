export function courseLevelUrls(baseUrl: string) {
  const url = `${baseUrl}/course-level`;
  return {
    root: url,
    edit: (id: number) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
