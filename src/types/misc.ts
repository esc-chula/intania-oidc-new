export interface Base {
    id: number;
}

export interface Department extends Base {
    code?: string;
    nameTh?: string;
    nameEn?: string;
}

export interface Country extends Base {
    code: string;
    name: string;
}

export interface Province extends Base {
    nameTh: string;
    nameEn: string;
    provinceCode: number;
}

export interface District extends Base {
    nameTh: string;
    nameEn: string;
    provinceCode: number;
    districtCode: number;
    postalCode: number;
}

export interface Religion extends Base {
    nameTh: string;
    nameEn: string;
}

export interface FamilyStatuses extends Base {
    valueTh: string;
    valueEn: string;
}

export interface FamilyMemberStatuses extends Base {
    valueTh: string;
    valueEn: string;
}
