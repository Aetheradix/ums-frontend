declare namespace CourseMaster { 
  interface SubjectCategoryCourseForm {
    categoryCode: string;
    categoryName: string;
    categoryNameHindi: string;
    isActive: boolean;
  }

  type SubjectCategoryItem = Data.WithId<SubjectCategory>;
}
