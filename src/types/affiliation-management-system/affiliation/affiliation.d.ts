declare namespace AffiliationMaster {
  interface ProgrammeFeeForm {
    programmeId: number;
    programmeName?: string;
    fixedDepositAmount: number;
    affiliationFee: number;
    inspectionFee: number;
    otherFee: number;
    isActive: boolean;
  }
  type ProgrammeFeeItem = Data.WithId<ProgrammeFeeForm, 'programmeFeeId'>;
}
