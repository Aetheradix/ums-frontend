declare namespace AffiliationManagementSystem {
  export interface DraftRegistrationRequest {
    registrationId: number;
    establishmentYear: number;
    collegeName: string;
    collegeCode: string;
    collegeAddress: string;
    districtId: number;
    telephoneNo: string;
    collegeEmail: string;
    collegeCategory: string;
    collegeType: string;
    accommodationType: string;
    collegeArea: string;
    applicationNumber?: string;
    availableFacilitiesOther?: string;
    availableFacilities: number[];
    affiliation?: AffiliationOtherDetailsDto;
    courses: CollegeCourseDetailDto[];
  }
}
