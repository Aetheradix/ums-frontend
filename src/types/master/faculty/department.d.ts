declare namespace Master {
  interface DepartmentForm {
    code: string;
    name: string;
    officeTypeId: number;
    hodName: string;
    contactNumber: number;
    isActive: boolean;
  }

  type DepartmentItem = Data.WithId<Department>;
}
