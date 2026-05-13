declare namespace Master {
  namespace SubjectMaster {
    interface ProgrammeModeOfEducationForm {
      code: string;
      name: string;
      isActive: boolean;
    }
    type ProgrammeModeOfEducationItem =
      Data.WithId<ProgrammeModeOfEducationForm>;

    interface SubjectCategoryForm {
      code: string;
      name: string;
      isActive: boolean;
    }
    type SubjectCategoryItem = Data.WithId<SubjectCategoryForm>;
    interface SubjectForm {
      subjectCode: string;
      subjectName: string;
      categoryId: number;
      isActive: boolean;
    }
    type SubjectItem = Data.WithId<SubjectForm>;
  }
}
