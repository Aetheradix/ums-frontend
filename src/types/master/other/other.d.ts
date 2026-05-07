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

    interface ProgrammeForm {
      name: string;
      programmeDuration: string;
      degreeLevelId: number;
    }

    interface Programme {
      name: string;
      programmeDuration: string;
      degreeLevelId: number;
      degreeLevelName?: string;
      isActive: boolean;
    }
    type ProgrammeItem = Data.WithId<Programme>;
  }
}
