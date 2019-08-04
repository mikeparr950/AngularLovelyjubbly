export interface ICountry {
    countryId: number;
    countryName: string;
    countryNameEn: string;
    countryNameFi: string;
}

export class Country implements ICountry {

    constructor(public countryId: number, public countryName: string, public countryNameEn: string, public countryNameFi: string) {
    }
}