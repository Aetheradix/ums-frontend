declare namespace CourseMaster {
  interface CourseStreamForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseStreamItem = Data.WithId<CourseStreamForm>;

  interface CourseModeOfEducationForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseModeOfEducationItem = Data.WithId<CourseModeOfEducationForm>;

  interface CourseExamTypeForm {
    code: string;
    name: string;
    isActive: boolean;
  }

  type CourseExamTypeItem = Data.WithId<CourseExamTypeForm>;
}
