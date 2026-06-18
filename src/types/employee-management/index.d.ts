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

  export interface QualificationInput {
    qualificationId: number;
    university?: string;
    board?: string;
    yearOfPassing?: number;
    percentage?: number;
    grade?: string;
  }

  export interface AddressInput {
    addressType: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    stateId?: number;
    districtId?: number;
    divisionId?: number;
    tehsilId?: number;
    blockId?: number;
    pinCode?: string;
  }

  export interface FullOnboardingForm {
    // Section A
    salutation: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    dateOfBirth: string | Date | null;
    appointedCategory: string;
    mobileNumber: string;
    officialEmail: string;
    panNumber?: string;
    bloodGroup?: string;
    maritalStatus?: string;

    // Section B
    employeeCode?: string;
    employeeType: string;
    employeeNatureId: number;
    organizationUnitId: number;
    postId: number;
    subjectSpecializationId: number;
    dateOfJoining: string | Date | null;
    seniorityRank?: string;

    // Additional DB Fields
    nationalityId?: number;
    religionId?: number;
    casteId?: number;
    fatherName?: string;
    motherName?: string;
    personalEmail?: string;
    alternateMobileNumber?: string;
    officePhoneNumber?: string;
    emergencyPhoneNumber?: string;
    personalWebsite?: string;
    bioNote?: string;
    dateOfSuperannuation?: string | Date | null;
    isPwbd?: boolean;
    drivingLicense?: string;
    passportNumber?: string;
    passportValidity?: string | Date | null;
    uanNumber?: string;

    // Section C & D
    qualifications: QualificationInput[];
    addresses: AddressInput[];
  }
}
