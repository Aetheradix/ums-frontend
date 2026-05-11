export const schemeUrls = (baseUrl: string) => {
  const prefix = `${baseUrl}/scheme`;
  return {
    root: prefix,
    create: `${prefix}/create`,
    edit: (id: string | number) => `${prefix}/edit/${id}`,
  };
};
