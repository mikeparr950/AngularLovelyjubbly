export interface IRefreshToken {
    refreshTokenId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    isEnabled: boolean;
}

export class RefreshToken implements IRefreshToken {

    constructor(public refreshTokenId: string, public userId: string, public startDate: Date,
        public endDate: Date, public isEnabled: boolean) {
    }
}
