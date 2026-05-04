declare namespace CourseMaster {
  interface SubjectCategoryCourseForm {
    categoryCode: string;
    categoryName: string;
    categoryNameHindi: string;
    isActive: boolean;
  }

  type SubjectCategoryItem = Data.WithId<SubjectCategoryCourseForm>;

  interface CourseDepartmentForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseDepartmentItem = Data.WithId<CourseDepartmentForm>;

  interface CourseLevelForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseLevelItem = Data.WithId<CourseLevelForm>;

  interface CourseExamTypeForm {
    code: string;
    name: string;
    isActive: boolean;
  }

  type CourseExamTypeItem = Data.WithId<CourseExamTypeForm>;
}
