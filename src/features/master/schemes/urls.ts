export const schemeUrls = {
  scheme: {
    root: '/master/schemes/scheme',
    create: '/master/schemes/scheme/create',
    edit: (id: number) => `/master/schemes/scheme/edit/${id}`,
  },
  schemeType: {
    root: '/master/schemes/scheme-type',
    create: '/master/schemes/scheme-type/create',
    edit: (id: number) => `/master/schemes/scheme-type/edit/${id}`,
  },
  schemeCategory: {
    root: '/master/schemes/scheme-category',
    create: '/master/schemes/scheme-category/create',
    edit: (id: number) => `/master/schemes/scheme-category/edit/${id}`,
  },
};

export default schemeUrls;
