export function courseModeOfEducationUrls(baseUrl: string) {
  const url = `${baseUrl}/course/course-mode-of-education`;
  return {
    root: url,
    edit: (id: number) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
