declare namespace GrievanceCategoryMaster {
  interface GrievanceCategoryTypeForm {
    name: string;
    code: string;
    CategoryTypeId: string;
  }

  type GrievanceCategoryTypeItem = Data.WithId<
    GrievanceCategoryTypeForm & {
      isActive: boolean;
      createdBy?: string;
      createdOn?: string;
      ipAddress?: string;
    }
  >;

  interface GrievanceCategoryForm {
    name: string;
    code: string;
    categoryType: string;
  }

  type GrievanceCategoryItem = Data.WithId<
    GrievanceCategoryForm & {
      isActive: boolean;
      createdBy?: string;
      createdOn?: string;
      ipAddress?: string;
    }
  >;
}
