declare namespace CareerAdvancement {
  export interface EmployeeSelfAssessmentForm {
    selfAssessmentId?: number;
    employeeId: number;
    tasksProject: string;
    workOutputScore: number | null;
    workOutputRemark?: string;
    sessionId: number | null;
    reviewingHeadId: number | null;
    leadershipQuality: string;
    communicationSkill: string;
    integrity: string;
    adaptability: string;
    teamWork: string;
    domainKnowledge: string;
    problemSolvingAbility: string;
    decisionMaking: string;
    analyticalSkill: string;
    functionalRemark?: string;
    additionalRemarks?: string;
    supportingDocument: File | null;
    status: string;
    isActive: boolean;
  }

  export interface PerformanceAppraisalApplicationForm {
    assessmentSessionId: number;
    stageApplyingFor: string;
    applicationSubmissionDate: Date | null;
    status: string;
  }

  export interface CreatePerformanceAppraisalApplicationPayload {
    employeeId: number;
    assessmentSessionId: number;
    stageApplyingFor: string;
    applicationSubmissionDate: string;
    status: string;
    isActive: boolean;
  }

  export interface UpdatePerformanceAppraisalApplicationPayload {
    applicationId: number;
    assessmentSessionId: number;
    stageApplyingFor: string;
    applicationSubmissionDate: string;
    status: string;
    isActive: boolean;
  }

  export interface PerformanceAppraisalApplicationDto {
    applicationId: number;
    employeeId: number;
    assessmentSessionId: number;
    stageApplyingFor: string;
    isSubmited?: boolean | null;
    finalForwardStatus?: string | null;
    applicationSubmissionDate: string;
    status: string;
    isActive: boolean;
  }

  export interface PerformanceAcademicForm {
    academicId?: number;
    qualificationId: number;
    universityInstitution: string;
    yearOfPassing: string;
    netsetQualified: 'Yes' | 'No';
    document: File;
    otherDocument?: File;
  }

  export interface CreateAcademicDetailPayload {
    applicationId: number;
    qualificationId: number;
    universityInstitution: string;
    yearOfPassing: number;
    netsetQualified: boolean | null;
    status: string;
    isActive: boolean;
    employeeId: number;
    assessmentSessionId: number;
    documentType: string;
    document: File | null;
  }

  export interface UpdateAcademicDetailPayload extends CreateAcademicDetailPayload {
    academicId: number;
  }
}
