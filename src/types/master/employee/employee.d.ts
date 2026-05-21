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

    interface SubjectSpecializationForm {
      name: string;
      isActive: boolean;
    }

    type SubjectSpecializationItem = Data.WithId<SubjectSpecializationForm>;
  }
}
