declare namespace CourseMaster {
  interface CourseTenureForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type CourseTenureItem = Data.WithId<CourseTenureForm>;
}
