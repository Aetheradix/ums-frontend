declare namespace CourseMaster {
  interface CourseTenureForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseTenureItem = Data.WithId<CourseTenureForm>;

  interface CourseDepartmentForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseDepartmentItem = Data.WithId<CourseDepartmentForm>;

  interface CourseStreamForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseStreamItem = Data.WithId<CourseStreamForm>;

  interface CourseLevelForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseLevelItem = Data.WithId<CourseLevelForm>;

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

  interface CourseMasterForm {
    code: string;
    name: string;
    levelId: number;
    departmentId: number;
    streamId: number;
    modeId: number;
    tenureId: number;
    examTypeId: number;
    totalTerms: number;
    description: string;
    isActive: boolean;
  }
  type CourseMasterItem = Data.WithId<CourseMasterForm>;
}
