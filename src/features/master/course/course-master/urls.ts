export function courseMasterUrls(baseUrl: string) {
  const url = `${baseUrl}/course/course-master`;
  return {
    root: url,
    edit: (id: number) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
