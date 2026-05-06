export function courseStreamUrls(baseUrl: string) {
  const url = `${baseUrl}/course/course-stream`;
  return {
    root: url,
    edit: (id: number) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
