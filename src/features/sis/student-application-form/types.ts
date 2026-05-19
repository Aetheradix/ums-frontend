export interface CreateApplicationCommand {
  academicSession: string;
  programme: string;
  academic: AcademicDto;
  basicInfo: BasicInfoDto;
  address: AddressDto;
}

export interface AcademicDto {
  degreeLevel: string;
  programOfStudy: string;
  specialisation: string;
  previousInstitutionType: string;
  previousInstitutionCgpa: number;
}

export interface BasicInfoDto {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  caste: string;
  dateOfBirth: string;
  age: number;
  fatherName: string;
  fatherOccupation: string;
  fatherDesignation: string;
  fatherAnnualIncome: number;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherDesignation: string;
  motherAnnualIncome: number;
  motherContactNumber: string;
  residencyStatus: string;
  ethnicity: string;
  nationality: string;
}

export interface AddressDto {
  addressType: string;
  country: string;
  state: string;
  division: string;
  district: string;
  tehsil: string;
  block: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  zipcode: number;
}

/**
 * Internal form shape used by react-hook-form.
 * Dropdown fields store the selected text value directly.
 */
export interface ApplicationFormData {
  // Top-level
  academicSession: string;
  programme: string;

  // Basic Info
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  caste: string;
  dateOfBirth: Date | null;
  age: number | null;
  fatherName: string;
  fatherOccupation: string;
  fatherDesignation: string;
  fatherAnnualIncome: number | null;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherDesignation: string;
  motherAnnualIncome: number | null;
  motherContactNumber: string;
  residencyStatus: string;
  ethnicity: string;
  nationality: string;

  // Academic
  degreeLevel: string;
  programOfStudy: any;
  specialisation: string;
  previousInstitutionType: string;
  previousInstitutionCgpa: number | null;

  // Address
  addressType: string;
  country: string;
  state: string;
  division: string;
  district: string;
  tehsil: string;
  block: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  zipcode: number | null;
}
