declare namespace AffiliationManagementSystem {
  export interface CollegeNocDetailForm {
    nocStatus: string;
    nocTypeId: number;
    nocReferenceNo: string;
    issueDate: Date | null;
  }

  export interface CollegeProfileDocumentForm {
    documentId?: string;
    documentType: string;
    documentName?: string;
    documentUrl?: string;
    file?: File | null;
  }

  export interface CollegeProfileForm {
    applicationNo: string;
    modeOfAffiliation: string;
    nameOfCollegeSociety: string;
    collegeStatus: string;
    formFee: number;
    nocDetails: CollegeNocDetailForm[];
    documents: CollegeProfileDocumentForm[];
  }

  export interface PhysicalInfrastructureForm {
    totalLandAreaOwned: string;
    buildingOwnershipStatus: string;
    totalNumberOfBuildings: string;
    physicalEducationFacility: string;
    hostelFacilityAvailable: string;
    staffQuarterDetails: string;
    boysHostelsCount?: number | null;
    girlsHostelsCount?: number | null;
    totalCapacity?: number | null;
  }

  export interface AmenityForm {
    teachingFacultyDetails: string;
    nonTeachingAdminStaff: string;
    coreFacilitiesForStudents: string;
  }

  export interface AcademicProgramForm {
    programmeType: string;
    regulatoryModelId: number;
    courseLevelId: number;
    facultyDeptId: number;
    programmeName: string;
    durationYears?: string;
    appliedYear?: string;
  }

  export interface ExistingProgramForm {
    regulatoryMode: string;
    courseLevel: string;
    facultyDeptId: number;
    programmeName: string;
    durationYears: string;
    appliedYear: string;
  }

  export type CollegeProfileWizardData = CollegeProfileForm &
    PhysicalInfrastructureForm &
    AmenityForm & {
      proposedPrograms: AcademicProgramForm[];
      existingPrograms: ExistingProgramForm[];
    };
}
