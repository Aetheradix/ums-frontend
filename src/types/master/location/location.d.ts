declare namespace Master {
  // State
  interface StateForm {
    code: string;
    name: string;
    isActive: boolean;
  }
  type StateItem = Data.WithId<StateForm>;

  // Division
  interface DivisionForm {
    code: string;
    name: string;
    stateId: number;
    isActive: boolean;
  }
  type DivisionItem = Data.WithId<DivisionForm>;

  // District
  interface DistrictForm {
    code: string;
    name: string;
    divisionId: number;
    isActive: boolean;
  }
  type DistrictItem = Data.WithId<DistrictForm>;

  // Tehsil
  interface TehsilForm {
    code: string;
    name: string;
    districtId: number;
    isActive: boolean;
  }
  type TehsilItem = Data.WithId<TehsilForm>;

  // Block
  interface BlockForm {
    code: string;
    name: string;
    districtId: number;
    tehsilId: number;
    isActive: boolean;
  }
  type BlockItem = Data.WithId<BlockForm>;
}
