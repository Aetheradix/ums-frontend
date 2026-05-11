declare namespace GrantMaster {
  interface GrantTypeForm {
    name: string;
  }

  type GrantTypeItem = Data.WithId<GrantTypeForm & { isActive: boolean; createdBy?: string; createdOn?: string; ipAddress?: string }>;

  interface GrantCategoryForm {
    name: string;
    grantTypeId: number;
  }

  type GrantCategoryItem = Data.WithId<GrantCategoryForm & { isActive: boolean; createdBy?: string; createdOn?: string; ipAddress?: string }>;
}
