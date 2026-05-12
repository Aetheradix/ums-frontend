declare namespace SubjectMaster {
  interface ProgrammeModeOfEducationForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type ProgrammeModeOfEducationItem = Data.WithId<ProgrammeModeOfEducationForm>;

  interface SubjectCategoryForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type SubjectCategoryItem = Data.WithId<SubjectCategoryForm>;
}
