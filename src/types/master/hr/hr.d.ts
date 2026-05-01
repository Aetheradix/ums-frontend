declare namespace Master {
  // Caste
  interface CasteForm {
    name: string;
    isActive: boolean;
  }
  type CasteItem = Data.WithId<CasteForm>;

  // Qualification
  interface QualificationForm {
    name: string;
    subject: string;
    code: string;
    isActive: boolean;
  }
  type QualificationItem = Data.WithId<QualificationForm>;

  // Religion
  interface ReligionForm {
    name: string;
    isActive: boolean;
  }
  type ReligionItem = Data.WithId<ReligionForm>;
}
