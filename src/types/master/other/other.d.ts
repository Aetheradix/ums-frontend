declare namespace Master {
  namespace Other {
    interface DegreeLevelForm {
      name: string;
    }

    interface DegreeLevel {
      name: string;
      isActive: boolean;
    }
    type DegreeLevelItem = Data.WithId<DegreeLevel>;

    // Academic-Year
    interface AcademicYearForm {
      name: string;
      session: string;
      isActive: boolean;
    }

    type AcademicYearItem = Data.WithId<AcademicYearForm>;
  }
}
