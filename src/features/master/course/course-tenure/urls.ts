export function courseTenureUrls(baseUrl: string) {
  const url = `${baseUrl}/course/course-tenure`;
  return {
    root: url,
    edit: (id: number) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
