declare namespace Master {
  namespace Employee {
    interface EmployeeGroupForm {
      name: string;
      description: string;
      isActive: boolean;
    }

    type EmployeeGroupItem = Data.WithId<EmployeeGroupForm>;
  }
}
