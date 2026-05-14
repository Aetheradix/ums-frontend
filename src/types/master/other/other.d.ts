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
    interface ProgrammeForm {
      name: string;
      programmeDuration: string;
      degreeLevelId: number;
    }

    // Nationality
    interface NationalityForm {
      name: string;
      isActive: boolean;
    }
    type NationalityItem = Data.WithId<NationalityForm>;

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
      id: String;
      text: string;
    }
    interface AddressTypeItem {
      id: string;
      text: string;
    }
    interface SemesterItem {
      id: String;
      text: string;
    }
    interface OccupationItem {
      id: string;
      text: string;
    }
    interface GenderItem {
      id: string;
      text: string;
    }
    interface RelationshipItem {
      id: string;
      text: string;
    }
    interface BloodGroupItem {
      id: string;
      text: string;
    }

    // Language-Preferences
    interface LanguagePreferenceItem {
      id: string;
      text: string;
    }
    interface DocumentTypeItem {
      id: string;
      text: string;
    }
  }
}
