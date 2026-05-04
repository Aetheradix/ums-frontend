export function courseExamTypeUrls(baseUrl: string) {
  const url = `${baseUrl}/course-exam-type`;
  return {
    root: url,
    edit: (id: number) => `${url}/edit/${id}`,
    create: `${url}/create`,
  };
}
