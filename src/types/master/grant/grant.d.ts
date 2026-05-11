declare namespace Master {
  namespace Grant {
    interface GrantTypeForm {
      name: string;
    }

    type GrantTypeItem = Data.WithId<GrantTypeForm & { isActive: boolean }>;

    interface GrantCategoryForm {
      name: string;
      grantTypeId: number;
    }

    type GrantCategoryItem = Data.WithId<GrantCategoryForm & { isActive: boolean }>;
  }
}
