export const nocTypeUrls = (baseUrl: string) => {
  const prefix = `${baseUrl}/noc-type`;
  return {
    root: prefix,
    create: `${prefix}/create`,
    edit: (id: string | number) => `${prefix}/edit/${id}`,
  };
};
