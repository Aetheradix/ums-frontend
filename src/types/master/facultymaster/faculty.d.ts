declare namespace Master {
  interface FacultyForm {
    code: string;
    name: string;
    officeTypeId: number;
    departmentId: number;
    designationId: number;
    joiningDate: Date;
    mobile: string;
    email: string;
    isActive: boolean;
  }
  type FacultyItem = Data.WithId<FacultyForm>;

  interface DepartmentForm {
    code: string;
    name: string;
    officeTypeId: number;
    hodName: string;
    contactNumber: number;
    isActive: boolean;
  }

  type DepartmentItem = Data.WithId<Department>;

  interface OfficeTypeForm {
    code: string;
    name: string;
    isActive: boolean;
  }

  type OfficeTypeItem = Data.WithId<OfficeType>;
}
