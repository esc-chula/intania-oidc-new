export interface Country {
    code: string;
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Province {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    nameTh: string;
    nameEn: string;
    provinceCode: number;
}

export interface District {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    nameTh: string;
    nameEn: string;
    provinceCode: number;
    districtCode: number;
    postalCode: number;
}

export interface Religion {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    nameTh: string;
    nameEn: string;
}
