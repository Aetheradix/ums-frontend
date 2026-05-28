export const categoryToUserMappingUrls = (baseUrl: string) => {
  const prefix = `${baseUrl}/category-to-user`;
  return {
    root: prefix,
    create: `${prefix}/create`,
    edit: (categoryId: number, userId: string) =>
      `${prefix}/edit?categoryId=${categoryId}&userId=${userId}`,
  };
};
