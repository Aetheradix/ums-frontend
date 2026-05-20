export interface StudentApplicationPayload {
  academicSession: string;
  programme: string;
  academic: {
    degreeLevel: string;
    programOfStudy: string;
    specialisation: string;
    previousInstitutionType: string;
    previousInstitutionCgpa: number;
  };
  basicInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    caste: string;
    dateOfBirth: string;
    age: number;
  };
}

export interface StudentApplication {
  studentApplicationId: number;
  academicSession: string;
  applicationDate: string;
  programme: string;
  isFeePaid: boolean;
  isApproved: boolean;
  lastDateOfSubmission: string;
  payload: StudentApplicationPayload;
}
