declare namespace AffiliationManagementSystem {
  export interface CollegeRegistrationForm {
    collegeCode: string;
    establishmentYearId: number;
    collegeName: string;
    collegeAddress: string;
    stateId: number;
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

  export interface CollegeAffiliationForm {
    affiliationId?: number;
    registrationId?: number;
    principalDirectorName: string;
    principalMobileNo: string;
    principalEmail: string;
    societyName: string;
    secretaryName: string;
    societyRegistrationNo: string;
    societyRegistrationDate: Date;
    isAnotherCollegeInstituteRunBySociety: boolean;
  }

  export interface CollegeCourseDetailForm {
    collegeCourseDetailId?: number;
    registrationId?: number;
    programmeFeesMappingId: number;
    totalAmount?: number;
    isFeePaid?: boolean;
    paymentDate?: string | null;
  }
  /** Combined form data for the multi-step application */
  export type CollegeApplicationFormData = CollegeRegistrationForm &
    CollegeAffiliationForm & {
      courses: CollegeCourseDetailForm[];
    } & {
      enclosures: Record<number, boolean>;
      nocFile: File | null;
      affidavitFile: File | null;
      regularAuthorityFile: File | null;
    };
}
