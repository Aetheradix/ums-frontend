declare namespace Master {
  namespace Employee {
    interface EmploymentNatureForm {
      name: string;
      isActive: boolean;
    }

    type EmploymentNatureItem = Data.WithId<EmploymentNatureForm>;

    interface OrganizationUnitForm {
      name: string;
      isActive: boolean;
    }
    type OrganizationUnitItem = Data.WithId<OrganizationUnitForm>;
  }
}
