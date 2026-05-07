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

    interface SpecialisationForm {
      name: string;
      programmeId: number;
    }
    interface Specialisation {
      name: string;
      programmeId: number;
      programmeName?: string;
      isActive: boolean;
    }
    type SpecialisationItem = Data.WithId<Specialisation>;

    interface ResidencyStatusItem {
      id: number;
      name: string;
    }
  }
}
