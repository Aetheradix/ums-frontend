declare namespace AffiliationManagementSystem {
  export interface CollegeRegistrationForm {
    collegeCode: string;
    establishmentYearId: number;
    collegeName: string;
    collegeAddress: string;
    districtId: number;
    telephoneNo: string;
    collegeEmail: string;
    collegeCategory: string;
    collegeType: string;
    accommodationType: string;
    collegeArea: string;
    availableFacilities: Record<number, boolean>;
    numberOfClassRooms: number;
    deficiencyEarlierRaisedByCommittee: string;
    deficiencyStatus?: string;
    deficiencyReason?: string;
  }

  export interface AffiliationOtherDetailsForm {
    affiliationId?: number;
    registrationId?: number;
    principalDirectorName: string;
    principalMobileNo: string;
    principalEmail: string;
    societyName: string;
    secretaryName: string;
    societyRegistrationNo: string;
    societyRegistrationDate: Date;
    isOtherInstitutionRunning: boolean;
  }

  export interface CollegeCourseDetailForm {
    collegeCourseDetailId?: number;
    registrationId?: number;
    programmeFeesMappingId: number;
    courseId?: number;
    subjectId?: number;
    totalAmount?: number;
    isFeePaid?: boolean;
    paymentDate?: string | null;
  }

  export interface CollegeAffiliationDocumentForm {
    documentId: string;
    documentType: string;
  }

  export interface CollegeRegistrationListItem {
    collegeRegistrationId: number;
    collegeName: string;
    collegeCategory: string;
    collegeType: string;
    collegeArea: string;
    isActive: boolean;
  }

  export type CollegeApplicationFormData = CollegeRegistrationForm &
    AffiliationOtherDetailsForm & {
      courses: CollegeCourseDetailForm[];
    } & {
      enclosures: Record<number, boolean>;
      nocFile: File | null;
      affidavitFile: File | null;
      regularAuthorityFile: File | null;
    };
}
