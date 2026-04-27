declare namespace OfficeTypeMaster {
  interface OfficeTypeForm {
    code: string;
    name: string;
    isActive: boolean;
  }

  type OfficeTypeItem = Data.WithId<OfficeType>;
}
