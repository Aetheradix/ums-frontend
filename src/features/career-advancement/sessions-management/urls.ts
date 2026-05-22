export const SESSIONS_MANAGEMENT_BASE_URL = 'career/sessions';

export const sessionsManagementUrls = (base: string) => {
  const prefix = `${base}/sessions-management`;
  return {
    root: prefix,
    list: prefix,
    create: prefix,
    getById: (id: number) => `${prefix}/${id}`,
    update: (id: number) => `${prefix}/${id}`,
    delete: (id: number) => `${prefix}/${id}`,
  };
};
