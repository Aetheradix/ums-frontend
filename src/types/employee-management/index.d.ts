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
    employeeCodeSelection: 'AutoGenerate' | 'Manual';
    employeeCode: string;
  }
}
