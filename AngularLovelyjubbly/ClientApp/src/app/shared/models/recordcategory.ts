export interface IRecordCategory {
    recordCategoryId: number;
    recordCategoryName: string;
    isPerSeason: boolean;
}

export class RecordCategory implements IRecordCategory {

    constructor(public recordCategoryId: number, public recordCategoryName: string, public isPerSeason: boolean) {
    }
}
