declare namespace Master {
  namespace College {
    interface CollegeTypeForm {
      name: string;
      isActive: boolean;
    }
    interface CollegeCategoryForm {
      name: string;
      collegeTypeId: number;
      isActive: boolean;
    }

    type CollegeTypeItem = Data.WithId<Master.College.CollegeTypeForm>;
    type CollegeCategoryItem = Data.WithId<Master.College.CollegeCategoryForm>;
  }
}
