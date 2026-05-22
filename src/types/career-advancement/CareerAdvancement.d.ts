declare namespace CareerAdvancement {
  export interface EmployeeSelfAssessmentForm {
    selfAssessmentId?: number;
    employeeId: number;
    tasksProjects: string;
    workOutputScore: number | null;
    workOutputRemarks?: string;
    assessmentYear: Date | null;
    assessmentPeriodFrom: Date | null;
    assessmentPeriodTo: Date | null;
    reviewingHeadId: number | null;
    leadershipQuality: string;
    communicationSkills: string;
    integrity: string;
    adaptability: string;
    teamWork: string;
    domainKnowledge: string;
    problemSolvingAbility: string;
    decisionMaking: string;
    analyticalSkills: string;
    functionalRemarks?: string;
    additionalRemarks?: string;
    supportingDocument: File | null;
    status: string;
    isActive: boolean;
  }
}
