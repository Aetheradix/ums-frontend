export const schemeUrls = (baseUrl: string) => {
  const prefix = `${baseUrl}/schemes`;
  return {
    scheme: {
      root: `${prefix}/scheme`,
      create: `${prefix}/scheme/create`,
      edit: (id: number) => `${prefix}/scheme/edit/${id}`,
    },
    schemeType: {
      root: `${prefix}/scheme-type`,
      create: `${prefix}/scheme-type/create`,
      edit: (id: number) => `${prefix}/scheme-type/edit/${id}`,
    },
    schemeCategory: {
      root: `${prefix}/scheme-category`,
      create: `${prefix}/scheme-category/create`,
      edit: (id: number) => `${prefix}/scheme-category/edit/${id}`,
    },
  };
};

export default schemeUrls;
