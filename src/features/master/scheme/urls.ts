export const schemeUrls = {
  scheme: {
    root: '/master/scheme/scheme',
    create: '/master/scheme/scheme/create',
    edit: (id: number) => `/master/scheme/scheme/edit/${id}`,
  },
  schemeType: {
    root: '/master/scheme/scheme-type',
    create: '/master/scheme/scheme-type/create',
    edit: (id: number) => `/master/scheme/scheme-type/edit/${id}`,
  },
  schemeCategory: {
    root: '/master/scheme/scheme-category',
    create: '/master/scheme/scheme-category/create',
    edit: (id: number) => `/master/scheme/scheme-category/edit/${id}`,
  },
};

export default schemeUrls;
