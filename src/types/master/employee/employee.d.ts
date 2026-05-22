declare namespace Master {
  namespace Employee {
    interface EmploymentNatureForm {
      name: string;
      isActive: boolean;
    }

    type EmploymentNatureItem = Data.WithId<EmploymentNatureForm>;
    interface ActionOptionForm {
      name: string;
      description: string;
      isActive: boolean;
    }

    type ActionOptionItem = Data.WithId<ActionOptionForm>;

    interface TravelPurposeForm {
      name: string;
      isActive: boolean;
    }

    type TravelPurposeItem = Data.WithId<TravelPurposeForm>;
  }
}
