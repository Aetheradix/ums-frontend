declare namespace CourseMaster {
  interface CourseStreamForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseStreamItem = Data.WithId<CourseStreamForm>;

  interface ProgrammeModeOfEducationForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type ProgrammeModeOfEducationItem = Data.WithId<ProgrammeModeOfEducationForm>;

  interface CourseExamTypeForm {
    code: string;
    name: string;
    isActive: boolean;
  }

  type CourseExamTypeItem = Data.WithId<CourseExamTypeForm>;
}
