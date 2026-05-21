export const grievanceCategoryUrls = (baseUrl: string) => {
  const prefix = `${baseUrl}/grievance-category`;
  return {
    root: prefix,
    create: `${prefix}/create`,
    edit: (id: string | number) => `${prefix}/edit/${id}`,
  };
};
