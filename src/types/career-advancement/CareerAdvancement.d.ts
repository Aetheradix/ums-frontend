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
}
