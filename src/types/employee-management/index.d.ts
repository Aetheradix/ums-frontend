declare namespace EmployeeManagement {
  export interface QuickOnboardingForm {
    employeeId?: number;

    // Employee Information
    employeeType: string;
    employeeNatureId: number | null;
    organizationUnitId: number | null;
    postId: number | null;
    designationId: number | null;
    seniorityRank: string;
    subjectSpecializationId: number | null;

    // Personal Information
    salutation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    appointedCategory: string;
    mobileNumber: number | string;
    officialEmail: string;
    dateOfBirth: Date | null;
    employeeCode: string;
  }

  export interface EmployeeBasicInfoDto {
    id: number;
    employeeCode: string;
    fullName: string;
    gender: string;
    employeeNature: string;
    organizationUnit: string;
    post: string;
    subjectSpecialization: string;
    mobileNumber: string;
    officialEmail: string;
  }

  export interface EmployeeDto extends QuickOnboardingForm {
    id: number;
    name: string;
    employeeNature?: string;
    organizationUnit?: string;
    post?: string;
    subjectSpecialization?: string;
    isActive?: boolean;
  }
}
