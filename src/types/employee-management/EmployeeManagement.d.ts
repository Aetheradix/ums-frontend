declare namespace EmployeeManagement {
  interface QuickOnboardingBase {
    employeeType: string;
    seniorityRank: string;
    salutation: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    casteId: number;
    mobileNumber: string;
    officialEmail: string;
    dateOfBirth: Date;
    employeeCode: string;
  }

  interface QuickOnboardingForm extends QuickOnboardingBase {
    employeeNatureId: number;
    postId: number;
    designationId: number;
    subjectSpecializationId: number;
    collegeTypeId?: number;
    registrationId?: number;
    parentUniversityName?: string | null;
    departmentGroupTypeId?: number;
    departmentGroupId?: number;
    departmentId?: number;
  }

  interface QuickOnboardingItem extends QuickOnboardingBase {
    employeeId: number;
    fullName: string;
    employeeNature: string;
    post: string;
    subjectSpecialization: string;
    isActive: boolean;
  }

  // ── List of all Employee ──
  interface ManageEmployeeItem extends QuickOnboardingBase {
    employeeId: number;
    fullName: string;
    employeeNature: string;
    post: string;
    subjectSpecialization: string;
    isActive: boolean;
  }

  // ── Full Onboarding Types ──

  interface AddressForm {
    addressType: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateId: number;
    divisionId: number;
    districtId: number;
    tehsilId: number;
    blockId: number;
    pinCode: string;
  }

  interface QualificationForm {
    qualificationId: number;
    university: string;
    board: string;
    yearOfPassing: number;
    percentage: number;
    grade: string;
  }

  interface FullOnboardingBase {
    // Quick Core fields
    employeeType: string;
    seniorityRank: string;
    salutation: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender: string;
    casteId: number;
    mobileNumber: string;
    officialEmail: string;
    dateOfBirth: Date;
    employeeCode: string;
    dateOfJoining: Date;

    // Extended Personal & Statutory
    bloodGroup: string;
    maritalStatus: string;
    isPersonWithDisability: boolean;
    fatherName: string;
    motherName: string;
    personalEmail: string;
    alternateMobileNumber: string;
    officePhoneNumber: string;
    emergencyContactName: string;
    emergencyRelation: string;
    emergencyPhoneNumber: string;
    personalWebsite: string;
    bioNote: string;
    aadharNumber: string;
    panNumber: string;
    uanNumber: string;
    drivingLicense: string;
    passportNumber: string;
    passportValidity: Date;
  }

  interface FullOnboardingForm extends FullOnboardingBase {
    employeeId?: number;
    employeeNatureId: number;
    postId: number;
    designationId: number;
    subjectSpecializationId: number;
    nationalityId: number;
    religionId: number;
    qualificationLevelId: number;
    qualifications: QualificationForm[];
    currentAddress: AddressForm;
    permanentAddress: AddressForm;
    isSameAsCurrentAddress: boolean;
    collegeTypeId?: number;
    registrationId?: number;
    parentUniversityName?: string | null;
    departmentGroupTypeId?: number;
    departmentGroupId?: number;
    departmentId?: number;
  }

  interface FullOnboardingItem extends FullOnboardingBase {
    employeeId: number;
    fullName: string;
    employeeNatureName: string;
    postName: string;
    designationName: string;
    subjectSpecializationName: string;
    nationalityName: string;
    religionName: string;
    qualificationLevelName: string;
    isActive: boolean;
  }
}
