declare namespace SIS {
  interface StudentAdditionalInformationItem {
    id: number;
    studentId: number;
    studentAcademicId: number;
    documentType: string;
    emergencyContactName: string;
    emergencyContact: string;
    emergencyRelation: string;
    emailNotification: boolean;
    smsNotification: boolean;
    pushNotification: boolean;
    languagePreferance?: string;
    profilePhotoUrl?: string;
  }

  interface StudentAdditionalInformationForm {
    studentId: number;
    studentAcademicId: number;
    documentType: string;
    emergencyContactName: string;
    emergencyContact: string;
    emergencyRelation: string;
    emailNotification: boolean;
    smsNotification: boolean;
    pushNotification: boolean;
    languagePreferance?: string;
    profilePhoto: File | null;
    profilePhotoUrl?: string; // For previewing existing photo
  }
}
